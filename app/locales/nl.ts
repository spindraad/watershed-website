import { nl as YearSelectorTranslations } from '~/components/YearSelector.translations';
export const { YearSelectorComponent } = YearSelectorTranslations;
import { nl as ProjectSummaryTranslations } from '~/components/ProjectSummary.translations';
export const { ProjectSummary } = ProjectSummaryTranslations;
import { nl as EventSummaryTranslations } from '~/components/EventSummary.translations';
export const { EventSummary } = EventSummaryTranslations;
import { nl as MakerProfileSummaryTranslations } from '~/components/MakerProfileSummary.translations';
export const { MakerProfileSummary } = MakerProfileSummaryTranslations;
import { nl as ProductSummaryTranslations } from '~/components/ProductSummary.translations';
export const { ProductSummary } = ProductSummaryTranslations;
import { nl as AccountMenuTranslations } from '~/routes/($lang)/account/AccountMenu.translations';
export const { AccountMenu } = AccountMenuTranslations;
import { nl as AdminMenuTranslations } from '~/routes/($lang)/beheer/AdminMenu.translations';
export const { AdminMenu } = AdminMenuTranslations;
import { nl as ConfirmDeleteDialogTranslations } from '~/routes/($lang)/beheer/$content/_index/ConfirmDeleteDialog.translations';
export const { ConfirmDeleteDialog } = ConfirmDeleteDialogTranslations;
import { nl as DeletionNotificationTranslations } from '~/routes/($lang)/beheer/$content/_index/DeletionNotification.translations';
export const { DeletionNotification } = DeletionNotificationTranslations;
import { nl as EventFormTranslations } from '~/components/EventMutationForm.translations';
export const { EventMutationForm } = EventFormTranslations;
import { nl as ProjectFormTranslations } from '~/components/ProjectMutationForm.translations';
export const { ProjectMutationForm } = ProjectFormTranslations;
import { nl as LocaleSelectorTranslations } from '~/components/LocaleSelector.translations';
export const { LocaleSelector } = LocaleSelectorTranslations;
import { nl as LocalisedInputTranslations } from '~/components/LocalisedInput.translations';
export const { LocalisedInput } = LocalisedInputTranslations;
import { nl as PageMutationFormTranslations } from '~/components/PageMutationForm.translations';
export const { PageMutationForm } = PageMutationFormTranslations;
import { nl as MenuEditorTranslations } from '~/components/MenuEditor.translations';
export const { MenuEditor } = MenuEditorTranslations;
import { nl as UpcomingEventsTranslations } from '~/components/UpcomingEvents.translations';
export const { UpcomingEvents } = UpcomingEventsTranslations;
import { nl as MakerOverviewTranslations } from '~/components/MakersOverview.translations';
export const { MakersOverview } = MakerOverviewTranslations;
import { nl as TalentProgramTranslations } from '~/components/TalentProgram.translations';
export const { TalentProgram } = TalentProgramTranslations;
import { nl as FooterTranslations } from '~/components/Footer.translations';
export const { Footer } = FooterTranslations;

export const common = {
  title: 'Hallo Wereld!',
  login: 'Inloggen',
  logout: 'Uitloggen',
};

export const LoginRoute = {
  Title: 'Inloggen',
  Meta: {
    Title: 'Inloggen | Stichting Watershed',
    Description: 'Log in op je account',
  },
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

export const AccountRoute = {
  Title: 'Account',
  Meta: {
    Title: 'Account | Stichting Watershed',
  },
};

export const AdminRoute = {
  Title: 'Beheer',
  Meta: {
    Title: 'Beheer | Stichting Watershed',
  },
};

export const ContentTypes = {
  // These use the content type as defined in the URLs
  evenementen_one: 'Evenement',
  evenementen_other: 'Evenementen',
  projecten_one: 'Project',
  projecten_other: 'Projecten',
  paginas_one: 'Pagina',
  paginas_other: "Pagina's",
};

export const ContentOverviewRoute = {
  ...ContentTypes,
  Meta: {
    Title:
      'Beheer - $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
  },
  Title: '$t(ContentTypes:{{content}}, capitalize)',
  NewButtonCaption: {
    Common: 'Nieuwe $t(ContentTypes:{{content}}, {"count": {{count}} })',
    Neuter: 'Nieuw $t(ContentTypes:{{content}}, {"count": {{count}} })',
  },
};

export const NewContentRoute = {
  Meta: {
    Title: {
      Common:
        'Nieuwe $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
      Neuter:
        'Nieuw $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
    },
  },
};

export const EditContentRoute = {
  Meta: {
    Title:
      'Bewerk $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
  },
};

export const EventIndexRoute = {
  Title: 'Evenementen',
  Meta: {
    Title: 'Evenementen | Stichting Watershed',
    Description: 'Bekijk onze aankomende evenementen',
  },
};

export const EventDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    Description: '{{description}}',
  },
};

export const ProjectIndexRoute = {
  Title: 'Projecten',
  Meta: {
    Title: 'Projecten | Stichting Watershed',
    Description: 'Bekijk onze projecten',
  },
};

export const ProjectDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    Description: '{{description}}',
  },
};

export const PageIndexRoute = {
  Title: "Pagina's",
  Meta: {
    Title: "Pagina's | Stichting Watershed",
    Description: "Bekijk onze pagina's",
  },
};

export const PageDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    description: '{{description}}',
  },
};

export const ManageMenuRoute = {
  Title: 'Menu beheren',
  Meta: {
    Title: 'Beheer navigatie menu | Stichting Watershed',
    Description: 'Beheer het menu',
  },
  EditorDescription: 'Sleep de items om de volgorde te wijzigen',
  ExampleDescription: 'Voorbeeld',
  CancelButtonCaption: 'Annuleren',
  SaveButtonCaption: 'Opslaan',
};
