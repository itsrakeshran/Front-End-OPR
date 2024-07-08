import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import SimpleLayout from 'layout/Simple';
import { SimpleLayoutType } from 'config';

import VendorsPages from 'pages/master/Vendor/vender';
import UsersPages from 'pages/master/Users/users';
import ItemsPages from 'pages/master/Items/items';
import NafdacCertificate from 'pages/permit/nafdacCertificate';
import SonCertificate from 'pages/permit/sonCertificate';
import Pending from 'pages/permit/pending';

//RFQ DROP DWON LIST ITEM PAGE
import GenrateRfqPage from 'pages/rfq/GenrateRfqPage';
import RfqListPage from 'pages/rfq/RfqListPage';
import NewQuotationPage from 'pages/rfq/QuotationPage';
import PurchaseOrderPage from 'pages/rfq/PurchaseOrderPage';
import CreateQuotation from 'pages/quotation/create';
import ViewQuotation from 'pages/quotation/quatation-page';
import ViewPoList from 'pages/purchaseOrder/Purchase_list';

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const AppContactUS = Loadable(lazy(() => import('pages/contact-us')));
const Dashboard = Loadable(lazy(() => import('pages/extra-pages/dashboard')));
const QuotationPage = Loadable(lazy(() => import('pages/quotation/quatation-page')));
const FormateForm = Loadable(lazy(() => import('pages/formate/format')));
const PO = Loadable(lazy(() => import('pages/purchaseOrder/po_index')));
const OPR = Loadable(lazy(() => import('pages/opr1/oprMain')));
const Po_page = Loadable(lazy(() => import('pages/opr1/oprMain')));

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'opr',
          element: <OPR />
        }
      ]
    },

    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/po/create',
          element: <PO />
        },
        {
          path: '/po/view',
          element: <ViewPoList />
        }
      ]
    },

    // Rfq Select Menu
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'rfq/genraterfq',
          element: <GenrateRfqPage />
        },
        {
          path: 'rfq/rfqlist',
          element: <RfqListPage />
        },
        {
          path: 'rfq/quotation',
          element: <NewQuotationPage />
        },
        {
          path: 'rfq/polist',
          element: <PurchaseOrderPage />
        }
      ]
    },

    //Qutation Module
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'quotation/create',
          element: <CreateQuotation />
        },
        {
          path: 'quotation/view',
          element: <ViewQuotation />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'quotation-page',
          element: <QuotationPage />
        }
      ]
    },

    //Permit drop downmodlue
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'permit/navdac',
          element: <NafdacCertificate />
        },
        {
          path: 'permit/son',
          element: <SonCertificate />
        },
        {
          path: 'permit/pending',
          element: <Pending />
        }
      ]
    },

    // MASTER Data second Version
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'master/vendor',
          element: <VendorsPages />
        },
        {
          path: 'master/users',
          element: <UsersPages />
        },
        {
          path: 'master/items',
          element: <ItemsPages />
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'formate',
          element: <FormateForm />
        }
      ]
    },

    {
      path: '/',
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [
        {
          path: 'contact-us',
          element: <AppContactUS />
        }
      ]
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;
