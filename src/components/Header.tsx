import type { FormInput } from "../App";

type HeaderProps = {
  form: FormInput;
  stage2: boolean;
};
export default function Header({ form, stage2 }: HeaderProps) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <header className="flex justify-center items-center w-full flex-col my-6 px-2">
      <img src={`${baseUrl}/images/logo-full.svg`} alt="" />
      <h1 className="text-preset-1 text-white text-center max-w-222 my-4">
        {stage2 ? (
          <>
            Congrats <span className="gradient-text">{form.name}!</span> Your
            ticket is ready.
          </>
        ) : (
          " Your Journey to Coding Conf 2025 Starts Here!"
        )}
      </h1>
      <p className="text-preset-4 text-neutral-300 max-w-[500px] text-center">
        {stage2 ? (
          <>
            We've emailed your ticket to{" "}
            <span className="text-orange-500">{form.email} </span> and will send
            updates in the run up to the event.
          </>
        ) : (
          " Secure your spot at next year's biggest coding conference."
        )}
      </p>
    </header>
  );
}
