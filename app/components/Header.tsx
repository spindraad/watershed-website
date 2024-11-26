import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '~/models/user.server';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  user?: User;
};

export default function Header({ user }: Props) {
  const { SlButton } = useContext(ShoelaceContext);
  const { t } = useTranslation();

  return (
    <div className="h-24 border-b-4 border-b-secondary">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-secondary">
            App
          </a>
        </div>
        <div className="flex items-center">
          {user ?
            <form method="POST" action="/uitloggen">
              <SlButton variant="text" type="submit" size="large">
                <span className="link">{t('logout')}</span>
              </SlButton>
            </form>
          : <SlButton variant="text" href="/inloggen" size="large">
              <span className="link">{t('login')}</span>
            </SlButton>
          }
        </div>
      </div>
    </div>
  );
}
