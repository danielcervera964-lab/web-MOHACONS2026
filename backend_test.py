#!/usr/bin/env python3
"""
MOHACONS Backend API Tests
Tests all backend APIs using the public endpoint
"""

import requests
import sys
import json
from datetime import datetime

class MOHACONSAPITester:
    def __init__(self, base_url="https://reforma-profesional.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        request_headers = {'Content-Type': 'application/json'}
        
        if headers:
            request_headers.update(headers)
        
        if self.token and 'Authorization' not in request_headers:
            request_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=request_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=request_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=request_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=request_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if endpoint.endswith('/login') and 'access_token' in response_data:
                        print(f"   Token received: {response_data['access_token'][:20]}...")
                    elif 'id' in str(response_data):
                        print(f"   Response contains ID field")
                except:
                    print(f"   Response: {response.text[:100]}")
            else:
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if response.text else {}

        except Exception as e:
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test basic API health"""
        success, _ = self.run_test(
            "API Health Check",
            "GET",
            "api/",
            200
        )
        return success

    def test_crear_presupuesto(self):
        """Test creating a budget request"""
        test_data = {
            "nombre": "Juan Pérez Test",
            "email": "juan.test@example.com",
            "telefono": "600123456",
            "tipoServicio": "Albañilería", 
            "direccion": "Calle Test 123, Madrid",
            "descripcion": "Necesito reformar el baño completo con alicatado y fontanería nueva",
            "presupuesto": "3000-5000",
            "urgencia": "normal"
        }
        
        success, response = self.run_test(
            "Create Budget Request",
            "POST",
            "api/presupuestos",
            201,
            data=test_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_crear_registro_llamada(self):
        """Test creating a call registration"""
        test_data = {
            "nombre": "María García Test",
            "email": "maria.test@example.com"
        }
        
        success, response = self.run_test(
            "Create Call Registration",
            "POST",
            "api/registros-llamada",
            201,
            data=test_data
        )
        
        if success and 'id' in response:
            return response['id']
        return None

    def test_admin_login(self, usuario="MOHAC", password="MOHA2026"):
        """Test admin login"""
        credentials = {
            "usuario": usuario,
            "password": password
        }
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/admin/login",
            200,
            data=credentials
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True
        return False

    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        credentials = {
            "usuario": "WRONG",
            "password": "WRONG"
        }
        
        success, _ = self.run_test(
            "Admin Login (Invalid Credentials)",
            "POST",
            "api/admin/login",
            401,
            data=credentials
        )
        return success

    def test_get_admin_estadisticas(self):
        """Test getting admin statistics"""
        if not self.token:
            print("❌ No token available for admin test")
            return False
            
        success, response = self.run_test(
            "Get Admin Statistics",
            "GET", 
            "api/admin/estadisticas",
            200
        )
        
        if success:
            required_fields = ['total_presupuestos', 'presupuestos_no_leidos', 'total_registros_llamada']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing required field: {field}")
                    return False
            print(f"   Statistics: {json.dumps(response, indent=2)}")
        
        return success

    def test_get_admin_presupuestos(self):
        """Test getting admin budget requests"""
        if not self.token:
            print("❌ No token available for admin test")
            return False
            
        success, response = self.run_test(
            "Get Admin Budget Requests",
            "GET",
            "api/admin/presupuestos",
            200
        )
        
        if success:
            print(f"   Found {len(response)} budget requests")
        
        return success, response

    def test_get_admin_registros_llamada(self):
        """Test getting admin call registrations"""
        if not self.token:
            print("❌ No token available for admin test")
            return False
            
        success, response = self.run_test(
            "Get Admin Call Registrations",
            "GET",
            "api/admin/registros-llamada", 
            200
        )
        
        if success:
            print(f"   Found {len(response)} call registrations")
        
        return success

    def test_unauthorized_access(self):
        """Test accessing protected endpoints without token"""
        # Temporarily remove token
        original_token = self.token
        self.token = None
        
        success, _ = self.run_test(
            "Unauthorized Access Test",
            "GET",
            "api/admin/estadisticas",
            401
        )
        
        # Restore token
        self.token = original_token
        return success

    def test_marcar_presupuesto_leido(self, presupuesto_id):
        """Test marking budget request as read"""
        if not self.token:
            print("❌ No token available for admin test")
            return False
        
        if not presupuesto_id:
            print("❌ No budget ID available for test")
            return False
            
        update_data = {"leido": True}
        
        success, _ = self.run_test(
            "Mark Budget as Read",
            "PATCH",
            f"api/admin/presupuestos/{presupuesto_id}",
            200,
            data=update_data
        )
        
        return success

def main():
    """Main test execution"""
    print("🏗️  MOHACONS Backend API Testing")
    print("=" * 50)
    
    tester = MOHACONSAPITester()
    
    # Test sequence
    print("\n🔧 Testing Public Endpoints...")
    
    # 1. Health check
    if not tester.test_health_check():
        print("❌ API not responding, stopping tests")
        return 1
    
    # 2. Test creating budget request
    presupuesto_id = tester.test_crear_presupuesto()
    
    # 3. Test creating call registration  
    registro_id = tester.test_crear_registro_llamada()
    
    print("\n🔐 Testing Admin Authentication...")
    
    # 4. Test admin login with wrong credentials
    tester.test_admin_login_invalid()
    
    # 5. Test unauthorized access
    tester.test_unauthorized_access()
    
    # 6. Test admin login
    if not tester.test_admin_login():
        print("❌ Admin login failed, stopping admin tests")
    else:
        print("\n📊 Testing Admin Endpoints...")
        
        # 7. Test admin statistics
        tester.test_get_admin_estadisticas()
        
        # 8. Test getting budget requests
        budget_success, budgets = tester.test_get_admin_presupuestos()
        
        # 9. Test getting call registrations
        tester.test_get_admin_registros_llamada()
        
        # 10. Test updating budget request if we have one
        if presupuesto_id:
            tester.test_marcar_presupuesto_leido(presupuesto_id)
    
    # Print final results
    print(f"\n📈 TEST RESULTS")
    print("=" * 30)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {len(tester.failed_tests)}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ FAILED TESTS:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}")
            if 'error' in failure:
                print(f"     Error: {failure['error']}")
            else:
                print(f"     Expected: {failure.get('expected')}, Got: {failure.get('actual')}")
                print(f"     Response: {failure.get('response', '')[:100]}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())