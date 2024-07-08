import { FormattedMessage } from 'react-intl';
import { DocumentText } from 'iconsax-react';
import { I24Support, MessageProgramming } from 'iconsax-react';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const icons = {
    quotationPage: DocumentText,
    userPage: DocumentText,
    maintenance: MessageProgramming,
    contactus: I24Support,
    quotation: RequestQuoteIcon,
    ReceiptLongIcon: ReceiptLongIcon
};


// ==============================|| MENU ITEMS - PAGES ||============================== //

const po_page = {
    id: 'group-pages',
    //title: <FormattedMessage id="pages" />,
    type: 'group',
    children: [
        {
            id: 'rfq',
            title: <FormattedMessage id="Purchase Order" />,
            type: 'collapse',
            icon: icons.ReceiptLongIcon,
            children: [
                {
                    id: 'itemlist',
                    title: <FormattedMessage id="Generate PO" />,
                    type: 'item',
                    url: '/po/create',
                    target: false
                },
                {
                    id: 'rfq_list',
                    title: <FormattedMessage id="View PO" />,
                    type: 'item',
                    url: '/po/view',
                    target: false
                }
            ]
        }
    ]
};


export default po_page;
