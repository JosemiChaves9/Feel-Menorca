import Link from 'next/link';

interface BestSpotsData {
  title: string;
  mainImageUrl: string;
  slug: string;
}

//TODO recieve spot id to key

interface Props {
  spots: BestSpotsData[];
}

export const BestPlaces = ({ spots }: Props) => {
  return (
    <section className='py-3 bg-gray-100'>
      <div className='container'>
        <div className='row mb-3'>
          <div className='col-md-8'>
            <p className='subtitle text-primary mt-4'>Inspírate</p>
            <h2>Las mejores calas para alquilar</h2>
          </div>
        </div>
        <div className='mx-n2 pt-3'>
          <div className='row pb-5'>
            {spots.map(({ mainImageUrl, title, slug }) => {
              return (
                <div className='col h-auto px-3' key={slug}>
                  <div className='card card-poster gradient-overlay hover-animate mb-4 mb-lg-0'>
                    <Link href={`/spot/${slug}`}>
                      <a className='tile-link' />
                    </Link>
                    <img
                      className='bg-image'
                      src={mainImageUrl}
                      alt='Card image'
                    />
                    <div className='card-body overlay-content'>
                      <h6 className='card-title text-shadow text-uppercase'>
                        {title}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
