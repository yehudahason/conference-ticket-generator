import type { FormInput } from "../App";

type TikcetProps = {
  ticket: string | null;
  avatar: string | null;
  form: FormInput;
};

export default function TicketStage({ ticket, avatar, form }: TikcetProps) {
  const date = new Date();

  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      <div className="flex mt-6 relative sm:w-auto w-full">
        <img
          src={`${baseUrl}/images/pattern-ticket.svg`}
          alt=""
          aria-hidden="true"
        />
        <span
          className="absolute top-5/11 -right-1 text-preset-3
              text-gray-400
              rotate-90
              "
          aria-label={`Ticket number ${ticket}`}
        >
          {ticket}
        </span>

        <div className="flex sm:bottom-6 ssm:left-6 bottom-2 left-3 absolute gap-6">
          {avatar ? (
            <img
              src={avatar}
              alt={`${form.name}'s avatar`}
              className=" z-10 ssm:h-22 ssm:w-22 h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            ""
          )}
          <div className="flex flex-col justify-center  gap-2">
            <h2 className="text-preset-3 text-white">{form.name}</h2>
            <p className="flex gap-2 items-center text-preset-5 text-gray-400">
              <img
                src={`${baseUrl}/images/icon-github.svg`}
                alt=""
                aria-hidden="true"
              />
              {form.github}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 absolute ssm:top-6 ssm:left-6 top-2 left-2 z-10">
          <img
            className=""
            src={`${baseUrl}/images/logo-full.svg`}
            alt="Coding Conf logo"
          />
          <span className="text-preset-6 text-gray-400">
            {formatted}&nbsp; / &nbsp;Austin, TX
          </span>
        </div>
      </div>
    </>
  );
}
