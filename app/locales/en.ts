import { en as YearSelectorTranslations } from '~/components/YearSelector.translations';
export const { YearSelectorComponent } = YearSelectorTranslations;
import { en as ProjectSummaryTranslations } from '~/components/ProjectSummary.translations';
export const { ProjectSummary } = ProjectSummaryTranslations;
import { en as EventSummaryTranslations } from '~/components/EventSummary.translations';
export const { EventSummary } = EventSummaryTranslations;
import { en as MakerProfileSummaryTranslations } from '~/components/MakerProfileSummary.translations';
export const { MakerProfileSummary } = MakerProfileSummaryTranslations;
import { en as ProductSummaryTranslations } from '~/components/ProductSummary.translations';
export const { ProductSummary } = ProductSummaryTranslations;
import { en as AccountMenuTranslations } from '~/routes/($lang)/account/AccountMenu.translations';
export const { AccountMenu } = AccountMenuTranslations;
import { en as AdminMenuTranslations } from '~/routes/($lang)/beheer/AdminMenu.translations';
export const { AdminMenu } = AdminMenuTranslations;
import { en as ContentTableTranslations } from '~/components/ContentTable.translations';
export const { ContentTable } = ContentTableTranslations;
import { en as ConfirmDeleteDialogTranslations } from '~/routes/($lang)/beheer/$content/_index/ConfirmDeleteDialog.translations';
export const { ConfirmDeleteDialog } = ConfirmDeleteDialogTranslations;
import { en as DeletionNotificationTranslations } from '~/routes/($lang)/beheer/$content/_index/DeletionNotification.translations';
export const { DeletionNotification } = DeletionNotificationTranslations;
import { en as EventFormTranslations } from '~/components/EventMutationForm.translations';
export const { EventMutationForm } = EventFormTranslations;
import { en as ProjectFormTranslations } from '~/components/ProjectMutationForm.translations';
export const { ProjectMutationForm } = ProjectFormTranslations;
import { en as LocaleSelectorTranslations } from '~/components/LocaleSelector.translations';
export const { LocaleSelector } = LocaleSelectorTranslations;
import { en as LocalisedInputTranslations } from '~/components/LocalisedInput.translations';
export const { LocalisedInput } = LocalisedInputTranslations;
import { en as PageMutationFormTranslations } from '~/components/PageMutationForm.translations';
export const { PageMutationForm } = PageMutationFormTranslations;
import { en as MenuEditorTranslations } from '~/components/MenuEditor.translations';
export const { MenuEditor } = MenuEditorTranslations;
import { en as UpcomingEventsTranslations } from '~/components/UpcomingEvents.translations';
export const { UpcomingEvents } = UpcomingEventsTranslations;
import { en as MakerOverviewTranslations } from '~/components/MakersOverview.translations';
export const { MakersOverview } = MakerOverviewTranslations;

export const common = {
  title: 'Hello World!',
  login: 'Login',
  logout: 'Logout',
};

export const LoginRoute = {
  Title: 'Login',
  Meta: {
    Title: 'Login | Stichting Watershed',
    Description: 'Login to your account',
  },
};

export const LoginFormComponent = {
  login: 'Login',
  forgotPassword: 'Forgot password?',
  Email: 'Email address',
  Password: 'Password',
  RememberMe: 'Remember me',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
    password: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
    },
    userNotFound: {
      ['invalid_credentials']: 'Invalid credentials',
    },
  },
};

export const ForgotPasswordRoute = {
  title: 'Forgot password',
  Email: 'Email address',
  Submit: 'Submit',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
  },
};

export const ForgotPasswordFormComponent = {
  Explanation:
    'Forgot your password? Enter your email address and we will send you an email with instructions to reset your password',
  EmailInputLabel: 'Email address',
  SubmitButton: 'Submit',
  Errors: {
    emailaddress: {
      ['invalid_type']: 'Invalid email address',
      ['invalid_email']: 'Invalid email address',
      ['too_small']: 'Email address is too short',
    },
  },
};

export const ForgetPasswordConfirmationComponent = {
  Title: 'Password reset email sent',
  ConfirmationMessage:
    'An email has been sent to your email address with instructions to reset your password',
};

export const ResetPasswordRoute = {
  Title: 'Reset password',
  Explanation: 'Enter a new password for your account',
  MissingEmail: 'The email address for resetting the password is missing',
  MissingToken: 'The token for resetting the password is missing',
  ExpiredToken:
    'The token for resetting the password has expired. Request a new password on the login page.',
};

export const ChangePasswordFormComponent = {
  EmailInputLabel: 'Email address',
  PasswordInputLabel: 'Password',
  RepeatPasswordInputLabel: 'Repeat password',
  SubmitButton: 'Submit',
  Errors: {
    password: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
      ['too_large']: 'Password is too long',
    },
    confirmPassword: {
      ['invalid_type']: 'Invalid password',
      ['too_small']: 'Password is too short',
      ['too_large']: 'Password is too long',
      ['passwords_do_not_match']: 'Passwords do not match',
    },
  },
};

export const ResetPasswordConfirmationComponent = {
  Title: 'Password changed',
  ConfirmationMessage: 'Your password has been changed',
};

export const ChangePasswordRoute = {
  Title: 'Change password',
  Explanation: 'Enter a new password for your account',
};

export const NewsOverviewRoute = {
  Title: 'News',
};

export const AccountRoute = {
  Title: 'Account',
  Meta: {
    Title: 'Account | Stichting Watershed',
  },
};

export const AdminRoute = {
  Title: 'Admin',
  Meta: {
    Title: 'Admin | Stichting Watershed',
  },
};

export const ContentTypes = {
  // These use the content type as defined in the URLs
  evenementen_one: 'Event',
  evenementen_other: 'Events',
  projecten_one: 'Project',
  projecten_other: 'Projects',
  paginas_one: 'Page',
  paginas_other: 'Pages',
};

export const ContentOverviewRoute = {
  ...ContentTypes,
  Meta: {
    Title:
      'Admin - $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
  },
  Title: '$t(ContentTypes:{{content}}, capitalize)',
  NewButtonCaption: {
    Common: 'New $t(ContentTypes:{{content}}, lowercase)',
    Neuter: 'New $t(ContentTypes:{{content}}, lowercase)',
  },
};

export const NewContentRoute = {
  Meta: {
    Title: 'New $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
  },
};

export const EditContentRoute = {
  Meta: {
    Title: 'Edit $t(ContentTypes:{{content}}, lowercase) | Stichting Watershed',
  },
};

export const EventIndexRoute = {
  Title: 'Events',
  Meta: {
    Title: 'Events | Stichting Watershed',
    Description: 'Upcoming events',
  },
};

export const EventDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    Description: '{{description}}',
  },
};

export const ProjectIndexRoute = {
  Title: 'Projects',
  Meta: {
    Title: 'Projects | Stichting Watershed',
    Description: 'Our projects',
  },
};

export const ProjectDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    Description: '{{description}}',
  },
};

export const PageIndexRoute = {
  Title: 'Pages',
  Meta: {
    Title: 'Pages | Stichting Watershed',
    Description: 'Our pages',
  },
};

export const PageDetailRoute = {
  Meta: {
    Title: '{{title}} | Stichting Watershed',
    description: '{{description}}',
  },
};

export const ManageMenuRoute = {
  Title: 'Manage menu',
  Meta: {
    Title: 'Manage navigation menu | Stichting Watershed',
    Description: 'Manage the navigation menu',
  },
  EditorDescription: 'Drag and drop to reorder the menu items',
  ExampleDescription: 'Example',
  CancelButtonCaption: 'Cancel',
  SaveButtonCaption: 'Save',
};
