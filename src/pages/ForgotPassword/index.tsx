import { ForgetPassword } from "../../components/ForgetPassword";
import { Header } from "../../components/Header";

export function ForgotPassword() {
  return (
    <div className="w-max-[144rem] flex h-[100%] flex-col bg-blue-dark">
      <Header showJustify={true} />
      <ForgetPassword />
    </div>
  ) 
}