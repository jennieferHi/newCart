import "@/styles/app.scss";
import MainLayout from '@/components/nav/Navigation/main-layout';
import { AuthProvider } from '@/hooks/use-auth';
import { BuyProvider } from '@/hooks/use-buy';
import { useTranslation } from "react-i18next";
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);
  const { t, i18n } = useTranslation();
  return (
    <AuthProvider>
      <BuyProvider>
        {getLayout(<Component {...pageProps} />)}
      </BuyProvider>
    </AuthProvider>
  );
}
