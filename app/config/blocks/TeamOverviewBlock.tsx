import { ComponentConfig, Field, FieldLabel } from '@puckeditor/core';
import TeamMember, { Props as TeamMemberProps } from '~/components/TeamMember';
import HandDrawnLine from '~/components/HandDrawnLine';

export type TeamOverviewBlockProps = {
  members: TeamMemberProps[];
};

const avatarField: Field = {
  label: 'Afbeelding',
  type: 'custom',
  render: ({ field, name, value, onChange }) => {
    return (
      <FieldLabel label={field.label as string}>
        <div className="flex flex-col gap-2">
          <ul className="flex flex-row gap-2">
            <li
              className={`border border-black py-2 px-1 ${value === '/illustraties/team-member-red.svg' ? 'bg-yellow-300' : 'bg-transparent'}`}
            >
              <button
                onClick={() => onChange('/illustraties/team-member-red.svg')}
              >
                <img
                  src="/illustraties/team-member-red.svg"
                  alt="Rood teamlid"
                  className="w-16 h-16 object-cover"
                />
              </button>
            </li>

            <li
              className={`border border-black py-2 px-1 ${value === '/illustraties/team-member-blue.svg' ? 'bg-yellow-300' : 'bg-transparent'}`}
            >
              <button
                onClick={() => onChange('/illustraties/team-member-blue.svg')}
              >
                <img
                  src="/illustraties/team-member-blue.svg"
                  alt="Rood teamlid"
                  className="w-16 h-16 object-cover"
                />
              </button>
            </li>

            <li
              className={`border border-black py-2 px-1 ${value === '/illustraties/team-member-green.svg' ? 'bg-yellow-300' : 'bg-transparent'}`}
            >
              <button
                onClick={() => onChange('/illustraties/team-member-green.svg')}
              >
                <img
                  src="/illustraties/team-member-green.svg"
                  alt="Rood teamlid"
                  className="w-16 h-16 object-cover"
                />
              </button>
            </li>
          </ul>

          <hr />

          <label>
            Of voer een eigen afbeelding URL in:
            <input
              type="text"
              name={name}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
              placeholder="https://example.com/afbeelding.jpg"
            />
          </label>
        </div>
      </FieldLabel>
    );
  },
};

export const TeamOverviewBlock: ComponentConfig<TeamOverviewBlockProps> = {
  label: 'Team',
  fields: {
    members: {
      type: 'array',
      label: 'Teamleden',
      arrayFields: {
        avatarUrl: avatarField,
        avatarAlt: {
          label: 'Avatar Alt Text',
          type: 'text',
        },
        name: {
          label: 'Naam',
          type: 'text',
        },
        role: {
          label: 'Rol',
          type: 'text',
        },
        email: {
          label: 'E-mail',
          type: 'text',
        },
        instagramUrl: {
          label: 'Instagram URL',
          type: 'text',
        },
        phoneNumber: {
          label: 'Telefoonnummer',
          type: 'text',
        },
        caption: {
          label: 'Caption',
          type: 'text',
        },
        quote: {
          label: 'Quote',
          type: 'textarea',
        },
      },
      defaultItemProps: {
        avatarUrl: '/illustraties/team-member-red.svg',
        name: 'Nieuw teamlid',
        role: 'teamlid',
      },
      getItemSummary: (item) => item.name ?? 'Teamlid',
    },
  },
  render: ({ members }) => <TeamOverviewBlockComponent members={members} />,
};

function TeamOverviewBlockComponent({ members }: TeamOverviewBlockProps) {
  const validMembers = retrieveValidMembers(members);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 not-prose">
      {validMembers.map((member, index) => (
        <div key={index} className="flex flex-col gap-4 h-full">
          <TeamMember {...member} />

          <HandDrawnLine classes="mt-auto" drawStyle="zigzag-thin" />
        </div>
      ))}
    </div>
  );
}

function retrieveValidMembers(members: unknown): TeamMemberProps[] {
  if (!Array.isArray(members)) {
    return [];
  }

  return members
    .filter((member) => typeof member === 'object' && member !== null)
    .map((member) => ({
      avatarUrl:
        typeof member.avatarUrl === 'string' ? member.avatarUrl : undefined,
      avatarAlt:
        typeof member.avatarAlt === 'string' ? member.avatarAlt : undefined,
      name: typeof member.name === 'string' ? member.name : 'Onbekend',
      role: typeof member.role === 'string' ? member.role : '',
      email: typeof member.email === 'string' ? member.email : undefined,
      instagramUrl:
        typeof member.instagramUrl === 'string' ?
          member.instagramUrl
        : undefined,
      phoneNumber:
        typeof member.phoneNumber === 'string' ? member.phoneNumber : undefined,
      caption: typeof member.caption === 'string' ? member.caption : undefined,
      quote: typeof member.quote === 'string' ? member.quote : undefined,
    }));
}
