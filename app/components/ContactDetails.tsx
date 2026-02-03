import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import Icon from '~/components/Icon';

export default function ContactDetails() {
  const { SlCopyButton } = useContext(ShoelaceContext);

  return (
    <ul className="not-prose flex flex-col gap-4">
      <li className="flex flex-row items-center gap-4 text-lg group">
        <Icon name="mail" />{' '}
        <span id="mailaddress">info@stichtingwatershed.nl</span>{' '}
        <SlCopyButton
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          from="mailaddress"
        />
      </li>

      <li className="flex flex-row items-center gap-4 text-lg group">
        <Icon name="phone" /> <span id="phone-number">06 19374776</span>{' '}
        <SlCopyButton
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          from="phone-number"
        />
      </li>

      <li className="flex flex-row items-start gap-4 text-lg">
        <Icon name="location" />
        <span id="address">
          Stichting Watershed <br />
          Pand P<br />
          Leenderweg 65
          <br />
          5614 HL Eindhoven
        </span>
      </li>
    </ul>
  );
}
