"use client";
import Image from "next/image";
import aboutImage from "../../images/aboutPage.png";
const About = () => {
  const data = [
    {
      title: " On-Demand Production",
      data: `Embrace a just-in-time (JIT) production approach where clothing items
        are manufactured only in response to customer orders. Partner with
        manufacturers capable of rapid and flexible production to accommodate
        varying demand.`,
    },
    {
      title: "Virtual Inventory",
      data: `Maintain a digital catalog or website showcasing clothing designs, sizes, and options available for purchase.
Eliminate physical inventory storage by transitioning to a virtual inventory model, where items are displayed online but produced only
upon order placement.`,
    },
    {
      title: "Pre-Order System",
      data: `Implement a pre-order system where customers can place orders for desired clothing items before they are manufactured.
Utilize customer feedback and pre-order data to inform production decisions and prioritize popular designs.`,
    },
    {
      title: "0% Waste",
      data: `Shopping on-demand helps the environment in a myriad of ways. When you shop on demand you are limiting both of our carbon
footprints dramatically, because you are generating 0% waste
We use Just in time method of Import/manufacturing which allows us to produce as per demand only and hence no over
production/over import. We do not stock up the goods in bulk unlike fast fashion brands. Hence it takes 7-14 days of manufacturing
period once you place the order.`,
    },
    {
      title: "Agile Supply Chain",
      data: ` Establish agile supply chain processes to facilitate seamless coordination between design, production, and fulfillment activities.
Embrace technology solutions such as real-time inventory tracking and automated order processing to enhance operational efficiency.`,
    },
    {
      title: "Continuous Improvement",
      data: `Monitor customer preferences, market trends, and demand patterns to refine and optimize the zero-inventory model over time.
Solicit feedback from customers and stakeholders to identify areas for improvement and innovation.`,
    },
  ];

  return (
    //     <div
    //  dangerouslySetInnerHTML={{ __html: product?.prodaddinfo }} />
    <div className="px-body my-5 text-center">
      <Image alt="banner" src={aboutImage} className="w-full h-auto"></Image>
      <div className="text-primary font-semibold text-3xl py-4">ABOUT US </div>
      <div className="font-semibold text-3xl my-2">
        “SHEIN Style Store was created in 2019 as fast fashion brand for GenZ”{" "}
      </div>

      <div className="my-7 text-xl">
        At <strong>SHEIN STYLE STORE</strong>, we understand that{" "}
        <strong>fast fashion</strong> isn't just about looking good; it's about
        feeling empowered and confident in your own skin. We're more than just a
        clothing brand; we're a movement dedicated to celebrating the unique
        style and individuality of <strong>Gen Z</strong> women everywhere.
      </div>

      <div className="font-semibold text-3xl my-2">
        “When you shop from SHEIN STYLE STORE ”
      </div>

      {data.map((item) => (
        <div key={item.data}>
          <div className="text-primary font-semibold text-xl">
            {item.title}{" "}
          </div>
          <div className="mb-7 mt-2 text-xl">{item.data}</div>
        </div>
      ))}

      <div className="flex flex-col md:grid md:grid-cols-2 my-14">
        <Image
          alt="banner"
          src={aboutImage}
          className=" h-80 xl:h-full w-full object-cover"
        ></Image>
        <div className="text-xl">
          <div className="text-primary font-semibold text-3xl">OUR STORY </div>
          <div className="px-2">
            <div className="py-2">
              Founded in 2019, SHEIN STYLE STORE has been privately partnered
              and operated by 3 Partners. SHEIN STYLE STORE has been committed
              to delivering unparalleled fast fashion products to customers
              worldwide since its inception in 2019.
            </div>
            <div className="py-2">
              Operating around the clock, seven days a week, we unveil over 100
              new products every week, ensuring that you have access to the
              latest trends at irresistible prices. Our goal is to make fast
              fashion accessible and exhilarating, empowering women across the
              globe to curate the wardrobes of their dreams.
            </div>
            <div className="py-2">
              The success of SHEIN STYLE STORE was born. SHEIN STYLE STORE
              opened its first Retail Store location in New Delhi City, INDIA
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 my-14">
        <div className="text-xl">
          <div className="text-primary font-semibold text-3xl">
            We are SHEIN STYLE STORE{" "}
          </div>
          <div className="px-2">
            <div className="py-2">
              " SHEIN STYLE STORE is the ultimate destination for trendsetters
              looking for -GenZ approved, Instagram-ready looks.
            </div>
            <div className="py-2">
              We are committed to bringing daily drops of new fashions and
              celebrity-worthy drops to the new generation of trendsetters.
            </div>
            <div className="py-2">
              Inspired by a combination of pop, streetwear, runway, and the
              creative genius of online and offline influencers, we curate the
              most popular looks that match your style sensibilities.
            </div>
            <div className="py-2">
              Fashion should be inclusive, affordable, and fun! Join us on this
              journey to redefine fashion for today’s modern generation and
              discover new trends, exclusive drops and endless inspiration.
            </div>
            <div className="py-2">
              <strong>
                “We want to become the world's most affordable fast fashion
                brand.”
              </strong>
            </div>
          </div>
        </div>
        <Image
          alt="banner"
          src={aboutImage}
          className=" h-80 xl:h-full w-full object-cover"
        ></Image>
      </div>

     <div className="flex justify-center items-center cursor-pointer">
     <div className=" my-4 px-10 py-4 text-xl xl:text-3xl bg-primary rounded-full text-white font-semibold w-full lg:w-[60%]">
        follow SHEIN STYLE STORE on Instagram
      </div>
     </div>

      <div className="text-primary font-semibold text-xl">
        SHEIN STYLE STORE INC
      </div>
      <div className="mb-7 mt-2 text-xl">
        19,Hauz Khas Village,New Delhi,INDIA - 110016
      </div>
    </div>
  );
};

export default About;
