import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "./Blog";
import heroBlog from "@/assets/hero-blog.jpg";

const blogContent: Record<string, {
  content: React.ReactNode;
  keywords: string;
}> = {
  "elevator-safety-tips-guide": {
    keywords: "elevator safety, lift safety tips, passenger safety, elevator emergency, escalator safety guide",
    content: (
      <>
        <p className="lead">
          Elevator safety is paramount for both passengers and building owners. With over 3000+ installations 
          across India, we at Rising Star Elevator have witnessed how proper safety awareness can prevent 
          accidents and ensure smooth vertical transportation.
        </p>

        <h2>Elevator Safety Tips for Passengers</h2>
        
        <h3>While Waiting</h3>
        <ul>
          <li>Stand away from the elevator doors while waiting</li>
          <li>Allow passengers to exit before entering</li>
          <li>Do not try to stop closing doors with hands or objects</li>
          <li>Pay attention to the direction indicator before entering</li>
        </ul>

        <h3>While Riding</h3>
        <ul>
          <li>Hold the handrail if available</li>
          <li>Stand clear of the doors</li>
          <li>Do not jump or play inside the elevator</li>
          <li>Press only your destination floor button</li>
          <li>Do not exceed the maximum capacity</li>
        </ul>

        <h3>In Case of Emergency</h3>
        <ul>
          <li>Stay calm and do not panic</li>
          <li>Press the emergency alarm button</li>
          <li>Use the intercom to communicate with building security</li>
          <li>Never try to force open the doors</li>
          <li>Wait for professional rescue</li>
        </ul>

        <h2>Escalator Safety Guidelines</h2>
        
        <h3>Entering the Escalator</h3>
        <ul>
          <li>Hold the handrail before stepping on</li>
          <li>Stand in the center of the step</li>
          <li>Keep loose clothing away from sides</li>
          <li>Supervise children at all times</li>
        </ul>

        <h3>While Riding</h3>
        <ul>
          <li>Face forward and hold the handrail</li>
          <li>Keep feet away from the sides</li>
          <li>Do not sit on escalator steps</li>
          <li>Stand still - walk only if the escalator is designed for it</li>
        </ul>

        <h2>Tips for Building Owners</h2>
        <ul>
          <li>Schedule regular maintenance through AMC contracts</li>
          <li>Display safety instructions prominently</li>
          <li>Ensure emergency contact numbers are visible</li>
          <li>Train building staff on emergency procedures</li>
          <li>Keep the elevator machine room locked and accessible only to authorized personnel</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Safety in vertical transportation is a shared responsibility. By following these guidelines, 
          passengers can ensure their safety, and building owners can provide a secure environment for 
          all users. For professional elevator services and safety consultations, contact Rising Star Elevator.
        </p>
      </>
    ),
  },
  "choosing-right-elevator-home": {
    keywords: "home elevator, residential lift, villa elevator, home lift India, elevator for house, gearless home lift, hydraulic lift",
    content: (
      <>
        <p className="lead">
          Installing an elevator in your home is a significant investment that enhances accessibility, 
          convenience, and property value. This guide will help you make an informed decision when 
          choosing the right elevator for your residence.
        </p>

        <h2>Types of Home Elevators</h2>

        <h3>1. Traction Elevators (Geared/Gearless)</h3>
        <p>
          Traction elevators use ropes and counterweights for smooth, efficient operation. 
          Gearless variants offer quieter operation and are ideal for modern homes.
        </p>
        <ul>
          <li>Smooth and quiet operation</li>
          <li>Energy efficient</li>
          <li>Suitable for 2-6 floors</li>
          <li>Speed: 0.63 to 1.0 m/s</li>
        </ul>

        <h3>2. Hydraulic Elevators</h3>
        <p>
          Hydraulic lifts use fluid pressure to move the elevator car. They are cost-effective 
          for low-rise applications.
        </p>
        <ul>
          <li>Cost-effective for 2-4 floors</li>
          <li>No machine room overhead needed</li>
          <li>Smooth start and stop</li>
          <li>Lower installation cost</li>
        </ul>

        <h3>3. MRL (Machine Room Less) Elevators</h3>
        <p>
          MRL elevators are modern solutions that do not require a dedicated machine room, 
          saving valuable building space.
        </p>
        <ul>
          <li>Space-efficient design</li>
          <li>Energy savings up to 40%</li>
          <li>Lower operating costs</li>
          <li>Modern aesthetics</li>
        </ul>

        <h2>Key Factors to Consider</h2>

        <h3>1. Space Requirements</h3>
        <p>
          Measure your available space including pit depth (typically 300-500mm for home lifts), 
          headroom (2500-3500mm), and shaft dimensions.
        </p>

        <h3>2. Capacity</h3>
        <p>
          Home elevators typically range from 4-6 passengers (272-408 kg). Consider future needs 
          including wheelchair accessibility.
        </p>

        <h3>3. Safety Features</h3>
        <p>Essential safety features include:</p>
        <ul>
          <li>Automatic Rescue Device (ARD)</li>
          <li>Overload protection</li>
          <li>Emergency alarm and intercom</li>
          <li>Infrared door sensors</li>
          <li>Battery backup</li>
        </ul>

        <h3>4. Aesthetics</h3>
        <p>
          Modern home elevators offer extensive customization options including premium cabin 
          finishes, glass doors, custom lighting, and designer panels.
        </p>

        <h2>Cost Considerations</h2>
        <p>
          Home elevator costs in India typically range from ₹5-15 lakhs depending on type, 
          capacity, floors, and customization. Factor in installation, civil work, and 
          annual maintenance costs.
        </p>

        <h2>Conclusion</h2>
        <p>
          Choosing the right home elevator requires careful consideration of your space, 
          budget, and long-term needs. Contact Rising Star Elevator for a free consultation 
          and customized recommendation for your home.
        </p>
      </>
    ),
  },
  "mrl-vs-traditional-elevators": {
    keywords: "MRL elevator, machine room less lift, gearless elevator, traditional elevator, elevator comparison, energy efficient lift",
    content: (
      <>
        <p className="lead">
          When planning an elevator installation, one of the most important decisions is choosing 
          between MRL (Machine Room Less) and traditional elevators. This comparison will help you 
          understand the key differences and make the right choice for your building.
        </p>

        <h2>What is an MRL Elevator?</h2>
        <p>
          MRL elevators use compact gearless traction machines installed within the hoistway, 
          eliminating the need for a separate machine room. The control system is typically 
          housed in a cabinet at the top landing.
        </p>

        <h2>What is a Traditional Elevator?</h2>
        <p>
          Traditional elevators require a dedicated machine room, usually located above the 
          hoistway, containing the motor, controller, and other equipment.
        </p>

        <h2>Key Differences</h2>

        <h3>1. Space Requirements</h3>
        <ul>
          <li><strong>MRL:</strong> No machine room required, saves 15-20 sq.m of space</li>
          <li><strong>Traditional:</strong> Requires machine room (15-20 sq.m)</li>
          <li><strong>MRL Headroom:</strong> Lower (3.6-4.2m)</li>
          <li><strong>Traditional Headroom:</strong> Higher (4.5-5.5m)</li>
        </ul>

        <h3>2. Energy Efficiency</h3>
        <ul>
          <li><strong>MRL:</strong> Up to 40% more energy efficient due to permanent magnet gearless motors</li>
          <li><strong>Traditional:</strong> Higher energy consumption with geared motors</li>
        </ul>

        <h3>3. Installation Cost</h3>
        <ul>
          <li><strong>MRL:</strong> Higher equipment cost, but lower civil work cost (no machine room)</li>
          <li><strong>Traditional:</strong> Lower equipment cost, but additional machine room construction</li>
        </ul>

        <h3>4. Maintenance</h3>
        <ul>
          <li><strong>MRL:</strong> Fewer components, lower maintenance cost, no gear oil changes</li>
          <li><strong>Traditional:</strong> More components, regular gear maintenance required</li>
        </ul>

        <h3>5. Noise Levels</h3>
        <ul>
          <li><strong>MRL:</strong> Quieter operation, machine in hoistway may cause slight vibration</li>
          <li><strong>Traditional:</strong> Noise contained in machine room, isolated from building</li>
        </ul>

        <h2>When to Choose MRL</h2>
        <ul>
          <li>New constructions where space is premium</li>
          <li>Buildings where machine room construction is difficult</li>
          <li>Projects prioritizing energy efficiency</li>
          <li>Residential and mid-rise commercial buildings</li>
        </ul>

        <h2>When to Choose Traditional</h2>
        <ul>
          <li>High-rise buildings (above 20 floors)</li>
          <li>Heavy-duty applications requiring high speeds</li>
          <li>Buildings where machine room space is available</li>
          <li>Projects with tight equipment budgets</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Both MRL and traditional elevators have their advantages. MRL is ideal for space-constrained, 
          energy-conscious projects, while traditional elevators suit high-rise and heavy-duty applications. 
          Contact Rising Star Elevator for expert guidance on the best solution for your project.
        </p>
      </>
    ),
  },
  "elevator-maintenance-importance": {
    keywords: "elevator maintenance, lift AMC, preventive maintenance, elevator service, lift repair, annual maintenance contract",
    content: (
      <>
        <p className="lead">
          Regular elevator maintenance is not just a legal requirement—it is essential for safety, 
          reliability, and cost management. Learn why preventive maintenance through AMC (Annual 
          Maintenance Contract) is crucial for your elevators.
        </p>

        <h2>Why is Elevator Maintenance Important?</h2>

        <h3>1. Safety First</h3>
        <p>
          Elevators are complex machines with numerous safety components. Regular inspections ensure:
        </p>
        <ul>
          <li>All safety devices function correctly</li>
          <li>Brake systems are properly adjusted</li>
          <li>Door sensors and interlocks work reliably</li>
          <li>Emergency systems are operational</li>
        </ul>

        <h3>2. Reduced Breakdown Risk</h3>
        <p>
          Preventive maintenance identifies and addresses issues before they cause breakdowns. 
          A well-maintained elevator has 80% fewer unplanned stoppages.
        </p>

        <h3>3. Extended Equipment Lifespan</h3>
        <p>
          Regular servicing extends your elevator lifespan by 5-10 years. Components like 
          ropes, guides, and bearings last longer with proper lubrication and adjustment.
        </p>

        <h3>4. Cost Savings</h3>
        <p>
          While AMC requires upfront investment, it saves money through:
        </p>
        <ul>
          <li>Prevention of expensive emergency repairs</li>
          <li>Lower energy consumption from optimized operation</li>
          <li>Reduced component replacement frequency</li>
          <li>Avoided penalties from regulatory violations</li>
        </ul>

        <h2>What Does AMC Include?</h2>

        <h3>Monthly Visits</h3>
        <ul>
          <li>Mechanical system inspection</li>
          <li>Electrical connection checks</li>
          <li>Lubrication of moving parts</li>
          <li>Door operation adjustment</li>
          <li>Ride quality assessment</li>
        </ul>

        <h3>Quarterly Services</h3>
        <ul>
          <li>Comprehensive safety device testing</li>
          <li>Control panel inspection</li>
          <li>Governor and safety gear testing</li>
          <li>Buffer inspection</li>
        </ul>

        <h3>Annual Inspection</h3>
        <ul>
          <li>Full system audit</li>
          <li>Load testing if required</li>
          <li>Compliance verification</li>
          <li>Detailed report with recommendations</li>
        </ul>

        <h2>Types of AMC</h2>

        <h3>Comprehensive AMC</h3>
        <p>
          Covers all maintenance, repairs, and parts replacement (except major items like 
          ropes and motors). Best for older elevators.
        </p>

        <h3>Semi-Comprehensive AMC</h3>
        <p>
          Covers maintenance and minor repairs. Major repairs and parts charged separately. 
          Suitable for elevators under 5 years old.
        </p>

        <h3>Basic AMC</h3>
        <p>
          Covers only preventive maintenance visits. All repairs and parts charged extra. 
          Budget-friendly option for new elevators.
        </p>

        <h2>Conclusion</h2>
        <p>
          Investing in regular elevator maintenance through a reliable AMC provider ensures 
          safety, minimizes downtime, and protects your investment. Rising Star Elevator 
          offers comprehensive AMC packages tailored to your needs with 24/7 emergency support.
        </p>
      </>
    ),
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug || ""];

  if (!post || !content) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="section-padding bg-background">
          <div className="container text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Blog Post Not Found
            </h1>
            <Link to="/blog" className="text-gold hover:underline">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://risingstarelevator.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rising Star Elevator Pvt. Ltd.",
    },
    "datePublished": post.date,
    "dateModified": post.date,
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={content.keywords}
        canonicalUrl={`/blog/${slug}`}
        ogType="article"
        structuredData={structuredData}
      />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBlog} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container relative z-10">
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link
                to="/blog"
                className="text-primary-foreground/70 hover:text-gold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Blog
              </Link>
              <span className="text-primary-foreground/50">/</span>
              <span className="text-gold font-medium line-clamp-1">
                {post.title}
              </span>
            </div>
            <div className="max-w-3xl">
              <span className="bg-gold/20 text-gold text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/70">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article */}
        <article className="section-padding bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {/* Featured Image */}
              <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none blog-content">
                {content.content}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="section-padding bg-secondary">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Related <span className="text-gradient-gold">Articles</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden card-hover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <span className="bg-gold/10 text-gold text-xs font-medium px-3 py-1 rounded-full">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-gold font-medium text-sm flex items-center gap-1 mt-4 group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Need Expert <span className="text-gradient-gold">Advice?</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our elevator experts are ready to help you with any questions about vertical transportation.
            </p>
            <Link to="/contact" className="btn-gold inline-flex items-center">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
