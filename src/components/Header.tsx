export default function Header() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <header className="flex justify-center items-center w-full flex-col my-6 px-2">
      <img src={`${baseUrl}/images/logo-full.svg`} alt="" />
      <h1 className="text-preset-1 text-white text-center max-w-222 my-4">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className="text-preset-4 text-neutral-300 text-center">
        Secure your spot at next year's biggest coding conference.
      </p>
    </header>
  );
}
