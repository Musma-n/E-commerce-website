import { useSelector } from "react-redux";

export default function About() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (

<div  className={`h-screen ${
        darkMode ? "bg-slate-900 text-white" : "bg-white text-black"
      }`}>

   <section id="about" class="py-16 px-6">
     <div class="max-w-4xl mx-auto text-center">
       <h1 class="text-4xl font-bold mb-6">About Us</h1>
       <p class="text-lg leading-relaxed mb-6">
         Welcome to our online store! We are committed to bringing you the best products with outstanding service. Whether you're looking for the latest technology, fashionable clothing, or home goods, we have something for everyone. Our goal is to make shopping enjoyable and affordable.
       </p>
      
      <h2 class="text-3xl font-semibold mb-4">Our Mission</h2>
       <p class="text-lg leading-relaxed mb-6">
         Our mission is to provide customers with high-quality products at competitive prices, combined with excellent customer service. We aim to make shopping online easier, faster, and more enjoyable.
       </p>

     
     </div>   </section>

</div>

  );
}

