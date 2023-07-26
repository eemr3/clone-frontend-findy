interface MenuRootProps {
  children: React.ReactNode;
}
export function MenuRoot({ children }: MenuRootProps) {
  return (
    <nav>
      <div
        className="mx-auto flex max-w-[135.6rem] justify-between py-8 2xl:ml-[39.07px] 
      2xl:mr-[121.07px]"
      >
        {children}
      </div>
    </nav>
  );
}
