import jwtDecode from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import { resumeSurveyByUserId } from '../../services/api';
import { Menu } from '../../components/menu';
import { LogoSmall } from '../../components/LogoSmall';
import { Button } from '../../components/Button';

export function DashboardPage() {
  const { getToken, signOut } = useContext(AuthContext);
  const [dataSurvey, setDataSurvey] = useState<any[]>([]);

  useEffect(() => {
    const getResumeSurvey = async () => {
      const { sub } = jwtDecode<any>(getToken());
      const response = await resumeSurveyByUserId(Number(sub));
      setDataSurvey(response?.data);
    };
    getResumeSurvey();
  }, []);

  return (
    <div className="w-max-[1483px] flex h-[100%] flex-col overflow-x-hidden bg-blue-dark opacity-90">
      <Menu.Root>
        <LogoSmall />
        <Menu.MenuItems className="justify-end">
          <Button onClick={signOut}>Sair</Button>
        </Menu.MenuItems>
      </Menu.Root>
      <h1 className="m-auto text-center text-3xl text-white">Dashboard</h1>
      <code className="m-auto text-[16px] text-white">
        <pre>{JSON.stringify(dataSurvey, null, 2)}</pre>
      </code>
    </div>
  );
}
