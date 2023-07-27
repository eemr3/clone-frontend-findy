interface MenuItemsProps {
  className?: string;
  children: React.ReactNode;
}

export function ItemMenuContent({ className, children }: MenuItemsProps) {
  return <div className={`flex w-[40%] items-center ${className}`}>{children}</div>;
}
