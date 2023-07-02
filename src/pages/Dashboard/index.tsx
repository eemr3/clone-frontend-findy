import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { NavBar } from '../../components/menu/NavBar';
import { resumeSurveyByUserId } from '../../services/api';
import { AuthContext } from '../../context/auth';

export function DashboardPage() {
  const { getToken } = useContext(AuthContext);
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
      <NavBar home={false} />
      <h1 className="m-auto text-center text-3xl text-white">Dashboard</h1>
      <code className="m-auto text-[16px] text-white">
        <pre>{JSON.stringify(dataSurvey, null, 2)}</pre>
      </code>
    </div>
  );
}
