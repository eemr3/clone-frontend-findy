import { FooterLand } from './Footer';
import Highlight from './Highlight';
import { Benefits } from './benefits';

export function Landing() {
  return (
    <div className="mx-auto flex w-[1356px] flex-col">
      <Highlight />
      <div className="flex fill-[solid] py-[20px]">
        <Benefits />
      </div>
    </div>
  );
}
