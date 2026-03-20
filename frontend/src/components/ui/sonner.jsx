import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-yellow-500 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-yellow-500 group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-gray-700 group-[.toast]:text-white",
        },
      }}
      {...props} />
  );
}

export { Toaster, toast }
