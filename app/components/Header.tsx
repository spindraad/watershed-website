import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '~/models/user.server';
import { ShoelaceContext } from '~/components/shoelace';
import Logo from '~/components/Logo';
import Anchor from '~/components/Anchor';

type Props = {
  user?: User;
};

export default function Header({ user }: Props) {
  const { SlButton, SlIcon } = useContext(ShoelaceContext);
  const { t } = useTranslation();

  return (
    <div className="h-24 border-b-4 border-b-secondary">
      <div className="container w-full mx-auto h-full flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="block w-28">
            <Logo />
          </a>
        </div>
        <div className="flex gap-2 items-center">
          <Anchor anchorType="nav" to="/evenementen">
            evenementen
          </Anchor>

          <Anchor anchorType="nav" to="/projecten">
            projecten
          </Anchor>

          <Anchor anchorType="nav" to="/about">
            over ons
          </Anchor>

          <Anchor anchorType="nav" to="/contact">
            contact
          </Anchor>

          {user ?
            <div className="ml-5 flex flex-row gap-4 items-center">
              <Anchor
                noUnderline
                anchorType="nav"
                to="/account"
                className="flex flex-row gap-2 items-center text-primary-500"
              >
                <SlIcon name="person-circle" />
                <span>{user.name}</span>
              </Anchor>
              <form method="POST" action="/uitloggen">
                <SlButton variant="primary" outline type="submit" size="small">
                  {t('logout')}
                </SlButton>
              </form>
            </div>
          : <SlButton variant="primary" outline href="/inloggen" size="small">
              {t('login')}
            </SlButton>
          }
        </div>
      </div>
    </div>
  );
}
