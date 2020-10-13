import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProductss: IProduct[];
}

export default function Home({ recommendedProductss }: HomeProps) {
  async function handleSum () {
    const math = (await import ('../lib/math')).default;

    alert(math.sum(3,5));
  }



  return (
    <div>
      <SEO title="DevCommerce, your e-commerce" image="boost.png"shouldExcludeTitleSuffix />


      <section>
      <Title>Products</Title>
      <ul>
        {recommendedProductss.map(recommendedProducts => {
          return (
            <li key={recommendedProducts.id}>
              {recommendedProducts.title}
            </li>
          );
        })}
      </ul>
      </section> 
      <button onClick={handleSum}>Sum</button> 
    </div>
  )
}


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProductss = await response.json();

  return {
    props: {
      recommendedProductss
    }
  }
}