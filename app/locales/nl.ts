import { nl as YearSelectorTranslations } from '~/routes/($lang)/nieuws/_index/YearSelector.translations';
export const { YearSelectorComponent } = YearSelectorTranslations;
import { nl as ProjectSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ProjectSummary.translations';
export const { ProjectSummary } = ProjectSummaryTranslations;
import { nl as EventSummaryTranslations } from '~/routes/($lang)/nieuws/_index/EventSummary.translations';
export const { EventSummary } = EventSummaryTranslations;
import { nl as ArtistProfileSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ArtistProfileSummary.translations';
export const { ArtistProfileSummary } = ArtistProfileSummaryTranslations;
import { nl as ArtistsSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ArtistsSummary.translations';
export const { ArtistsSummary } = ArtistsSummaryTranslations;
import { nl as ProductSummaryTranslations } from '~/routes/($lang)/nieuws/_index/ProductSummary.translations';
export const { ProductSummary } = ProductSummaryTranslations;
import { nl as AccountMenuTranslations } from '~/routes/($lang)/account/AccountMenu.translations';
export const { AccountMenu } = AccountMenuTranslations;
import { nl as AdminMenuTranslations } from '~/routes/($lang)/beheer/AdminMenu.translations';
export const { AdminMenu } = AdminMenuTranslations;
import { nl as ContentTableTranslations } from '~/components/ContentTable.translations';
export const { ContentTable } = ContentTableTranslations;

export const common = {
  title: 'Hallo Wereld!',
  login: 'Inloggen',
  logout: 'Uitloggen',
};

export const login = {
  title: 'Inloggen',
  username: 'Gebruikersnaam',
  password: 'Wachtwoord',
};

export const LoginFormComponent = {
  login: 'Inloggen',
  forgotPassword: 'Wachtwoord vergeten?',
  Email: 'E-mailadres',
  Password: 'Wachtwoord',
  RememberMe: 'Onthoud mij',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
    password: {
      ['invalid_type']: 'Ongeldig wachtwoord',
      ['too_small']: 'Wachtwoord is te kort',
    },
    userNotFound: {
      ['invalid_credentials']: 'Ongeldige inloggegevens',
    },
  },
};

export const ForgotPasswordRoute = {
  title: 'Wachtwoord vergeten',
  Email: 'E-mailadres',
  Submit: 'Verzenden',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
  },
};

export const ForgotPasswordFormComponent = {
  Explanation:
    'Ben je je wachtwoord vergeten? Vul je e-mailadres in en we sturen je een e-mail met instructies om je wachtwoord opnieuw in te stellen.',
  EmailInputLabel: 'E-mailadres',
  SubmitButton: 'Verzenden',
  Errors: {
    emailaddress: {
      ['invalid_string']: 'Ongeldig e-mailadres',
      ['invalid_email']: 'Ongeldig e-mailadres',
      ['too_small']: 'E-mailadres is te kort',
    },
  },
};

export const ForgetPasswordConfirmationComponent = {
  Title: 'Wachtwoord reset e-mail verzonden',
  ConfirmationMessage:
    'Er is een e-mail naar je e-mailadres gestuurd met instructies om je wachtwoord opnieuw in te stellen',
};

export const ResetPasswordRoute = {
  Title: 'Wachtwoord resetten',
  Explanation: 'Voer een nieuw wachtwoord in voor je account',
  MissingEmail:
    'Het e-mailadres voor het resetten van het wachtwoord ontbreekt',
  MissingToken: 'De token voor het resetten van het wachtwoord ontbreekt',
  ExpiredToken:
    'De token voor het resetten van het wachtwoord is verlopen. Vraag een nieuw aan wachtwoord aan op de inlogpagina.',
};

export const ChangePasswordFormComponent = {
  EmailInputLabel: 'E-mailadres',
  PasswordInputLabel: 'Wachtwoord',
  RepeatPasswordInputLabel: 'Herhaal wachtwoord',
  SubmitButton: 'Verzenden',
  Errors: {
    password: {
      ['invalid_type']: 'Ongeldig wachtwoord',
      ['too_small']: 'Wachtwoord is te kort',
      ['too_large']: 'Wachtwoord is te lang',
    },
    confirmPassword: {
      ['invalid_type']: 'Ongeldig wachtwoord',
      ['too_small']: 'Wachtwoord is te kort',
      ['too_large']: 'Wachtwoord is te lang',
      ['passwords_do_not_match']: 'Wachtwoorden komen niet overeen',
    },
  },
};

export const ResetPasswordConfirmationComponent = {
  Title: 'Wachtwoord gewijzigd',
  ConfirmationMessage: 'Je wachtwoord is gewijzigd',
};

export const ChangePasswordRoute = {
  Title: 'Wachtwoord wijzigen',
  Explanation: 'Voer een nieuw wachtwoord in voor je account',
};

export const NewsOverviewRoute = {
  Title: 'Nieuws',
};

export const ContentOverviewRoute = {
  Titles: {
    events: 'Evenementen',
    projects: 'Projecten',
  },
};
