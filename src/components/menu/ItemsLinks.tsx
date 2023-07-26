import { Link } from 'react-router-dom';

export function ItemsLinks() {
  return (
    <>
      <Link className="text-[18px] uppercase text-green-medium" to="/">
        A Findy
      </Link>
      <Link className="text-[18px] uppercase text-green-medium" to="/login">
        Login
      </Link>
    </>
  );
}
