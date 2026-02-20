import Heading from '~/components/Heading';
import Icon from '~/components/Icon';

type Props = {
  avatarUrl?: string;
  avatarAlt?: string;
  name: string;
  role: string;
  email?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  caption?: string;
  quote?: string;
};

export default function TeamMember({
  avatarUrl,
  avatarAlt,
  name,
  role,
  email,
  instagramUrl,
  phoneNumber,
  caption,
  quote,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center sm:flex-row gap-4">
        {avatarUrl ?
          <img
            src={avatarUrl}
            alt={avatarAlt ?? name}
            className="w-32 h-32 object-cover"
          />
        : <img
            src="/illustraties/team-member-red.svg"
            alt={avatarAlt ?? name}
            className="w-32 h-32 object-cover"
          />
        }

        <div className="text-center sm:text-left flex flex-col gap-1">
          <Heading level={3} colorClass="text-black" textSizeClass="text-lg">
            {name}
          </Heading>
          <p className="text-sm">{role}</p>
          {email ?
            <a
              href={`mailto:${email}`}
              className="text-sm text-blue-500 underline"
            >
              {email}
            </a>
          : null}

          <ul className="flex flex-row gap-1 justify-center sm:justify-start">
            {email ?
              <li>
                <a href={`mailto:${email}`}>
                  <Icon name="mail" size="small" />
                </a>
              </li>
            : null}
            {instagramUrl ?
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="instagram" size="small" />
                </a>
              </li>
            : null}
            {phoneNumber ?
              <li>
                <a href={`tel:${phoneNumber}`}>
                  <Icon name="phone" size="small" />
                </a>
              </li>
            : null}
          </ul>
        </div>
      </div>

      {caption ?
        <p className="text-xl font-gt-haptik-rotalic italic tracking-widest font-medium text-center">
          {caption}
        </p>
      : null}

      {quote ?
        <blockquote className="italic font-light text-center">
          {quote}
        </blockquote>
      : null}
    </div>
  );
}
