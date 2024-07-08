import { FormattedMessage } from 'react-intl';
import { DocumentText, DocumentDownload } from 'iconsax-react';

const icons = {
  quotationPage: DocumentText,
  rfqsPage: DocumentDownload
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //
const quotation = {
  id: 'group-pages',
  type: 'group',
  children: [
    {
      id: 'maintenance',
      title: <FormattedMessage id="Quotation" />,
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'ItemCreate',
          title: <FormattedMessage id="Entry " />,
          type: 'item',
          url: '/quotation/create',
          target: false
        },
        {
          id: 'ItemView',
          title: <FormattedMessage id="View " />,
          type: 'item',
          url: '/quotation/view',
          target: false
        }
      ]
    }
  ]
};



export default quotation;
