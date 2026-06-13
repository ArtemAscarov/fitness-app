import Footer from "@/widgets/Footer";
import Header from "@/widgets/Header";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
