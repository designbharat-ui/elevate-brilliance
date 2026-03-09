
-- Seed header and footer menus
DELETE FROM menus WHERE name IN ('header', 'footer');

INSERT INTO menus (name, items) VALUES
('header', '[
  {"id":"h1","label":"Home","href":"/"},
  {"id":"h2","label":"About","href":"/about","children":[
    {"id":"h2a","label":"Vision & Mission","href":"/vision-mission"},
    {"id":"h2b","label":"Business Strategy","href":"/business-strategy"}
  ]},
  {"id":"h3","label":"Products","href":"/products","children":[
    {"id":"h3a","label":"Home Lifts","href":"/products/home-lift"},
    {"id":"h3b","label":"Passenger Elevators","href":"/products/passenger-elevator"},
    {"id":"h3c","label":"Hospital Elevators","href":"/products/hospital-elevator"},
    {"id":"h3d","label":"Capsule Elevators","href":"/products/capsule-elevator"},
    {"id":"h3e","label":"Product Features","href":"/product-features"}
  ]},
  {"id":"h4","label":"Services","href":"/services","children":[
    {"id":"h4a","label":"AMC","href":"/services/amc"},
    {"id":"h4b","label":"Maintenance","href":"/services/maintenance"},
    {"id":"h4c","label":"Repair","href":"/services/repair"},
    {"id":"h4d","label":"Modernization","href":"/services/modernization"}
  ]},
  {"id":"h5","label":"Projects","href":"/projects"},
  {"id":"h6","label":"Gallery","href":"/gallery"},
  {"id":"h7","label":"Contact","href":"/contact"},
  {"id":"h8","label":"Get Quote","href":"/get-quote"}
]'::jsonb),
('footer', '[
  {"id":"f1","label":"Home","href":"/"},
  {"id":"f2","label":"About Us","href":"/about"},
  {"id":"f3","label":"Vision & Mission","href":"/vision-mission"},
  {"id":"f4","label":"Products","href":"/products"},
  {"id":"f5","label":"Services","href":"/services"},
  {"id":"f6","label":"Gallery","href":"/gallery"},
  {"id":"f7","label":"Projects","href":"/projects"},
  {"id":"f8","label":"Contact","href":"/contact"},
  {"id":"f9","label":"Get Quote","href":"/get-quote"},
  {"id":"f10","label":"Blog","href":"/blog"},
  {"id":"f11","label":"Sitemap","href":"/sitemap"}
]'::jsonb);

-- Seed HOME page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "badge_text":"21+ Years of Excellence in Vertical Transportation",
    "title":"Elevating Your",
    "highlight_text":"World",
    "subtitle":"One Floor at a Time",
    "description":"Rising Star Elevator delivers premium vertical transportation solutions with cutting-edge technology, safety-first design, and unmatched aesthetics for residential, commercial, and industrial spaces.",
    "cta_primary_text":"Get Free Quote",
    "cta_primary_link":"/get-quote",
    "cta_secondary_text":"View Our Projects",
    "cta_secondary_link":"/gallery"
  }},
  {"id":"services","type":"services_grid","fields":{
    "label":"What We Do",
    "title":"Comprehensive Elevator",
    "highlight_text":"Solutions",
    "description":"From new installations to modernization, we provide end-to-end vertical transportation services.",
    "items":[
      {"icon":"Wrench","title":"New Installations","description":"Complete elevator and escalator installation for all building types.","features":["Residential Lifts","Commercial Elevators","Hospital Elevators","Goods Lifts"],"link":"/services"},
      {"icon":"FileCheck","title":"AMC Services","description":"Annual maintenance contracts ensuring peak performance and safety.","features":["Regular Inspections","Parts Replacement","Safety Audits","24/7 Support"],"link":"/services/amc"},
      {"icon":"RefreshCw","title":"Modernization","description":"Upgrade aging elevators with latest technology and improved safety.","features":["Control Systems","Door Operators","Safety Features","Energy Efficiency"],"link":"/services/modernization"},
      {"icon":"Headphones","title":"Repair & Support","description":"24/7 emergency repair services with trained technicians.","features":["Emergency Response","Breakdown Repair","Parts Supply","Technical Support"],"link":"/services/repair"}
    ]
  }},
  {"id":"stats","type":"stats","fields":{
    "items":[
      {"value":"21","suffix":"+","label":"Years Experience","description":"Two decades of industry excellence"},
      {"value":"3000","suffix":"+","label":"Installations","description":"Successful projects across India"},
      {"value":"30","suffix":"+","label":"Expert Mechanics","description":"Trained technicians at your service"},
      {"value":"100","suffix":"%","label":"IS Code Compliant","description":"Meeting all safety standards"}
    ]
  }},
  {"id":"products","type":"products_grid","fields":{
    "label":"Our Range",
    "title":"Premium Elevator",
    "highlight_text":"Products",
    "items":[
      {"name":"Home Lifts","description":"Elegant residential elevators designed for modern homes.","category":"Residential","slug":"home-lift"},
      {"name":"Passenger Elevators","description":"High-performance elevators for commercial buildings.","category":"Commercial","slug":"passenger-elevator"},
      {"name":"Hospital Elevators","description":"Spacious, smooth-ride elevators for healthcare facilities.","category":"Specialized","slug":"hospital-elevator"},
      {"name":"Capsule Elevators","description":"Panoramic glass elevators for premium aesthetics.","category":"Premium","slug":"capsule-elevator"}
    ]
  }},
  {"id":"why_choose","type":"features","fields":{
    "label":"Why Choose Us",
    "title":"The Rising Star",
    "highlight_text":"Advantage",
    "description":"We combine decades of experience with cutting-edge technology to deliver elevator solutions that exceed expectations.",
    "items":[
      {"title":"Safety First","description":"IS Code compliant equipment with all necessary safety features including microprocessor controls and infrared curtains"},
      {"title":"21+ Years Experience","description":"Two decades of expertise in vertical transportation with thousands of successful installations"},
      {"title":"Expert Technicians","description":"30+ trained mechanics and engineers dedicated to installation and after-sales service excellence"},
      {"title":"24/7 Support","description":"Round-the-clock emergency support ensuring minimal downtime and maximum equipment uptime"},
      {"title":"Premium Quality","description":"Top-tier components and aesthetic options customized for residential, commercial, and medical applications"},
      {"title":"Competitive Pricing","description":"Quality equipment and services at affordable prices without compromising on standards"}
    ]
  }},
  {"id":"testimonials","type":"testimonials","fields":{
    "label":"Testimonials",
    "title":"What Our Clients",
    "highlight_text":"Say",
    "items":[
      {"name":"Rajesh Kumar","role":"Property Developer","company":"Kumar Builders","quote":"Rising Star Elevator transformed our residential project with their premium home lifts. The quality and service are unmatched.","rating":"5"},
      {"name":"Dr. Priya Sharma","role":"Hospital Director","company":"City Medical Center","quote":"Their hospital elevators meet all our requirements perfectly. The smooth operation and safety features give us complete confidence.","rating":"5"},
      {"name":"Amit Verma","role":"Facility Manager","company":"Wave Infratech","quote":"We have been working with Rising Star for over 5 years. Their AMC service is prompt and their team is highly professional.","rating":"5"}
    ]
  }}
]}'::jsonb WHERE slug = 'home';

-- Seed ABOUT page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"About Us",
    "title":"21+ Years of Excellence in Vertical Transportation",
    "description":"Rising Star Elevator Pvt. Ltd. — a growing organization managed by a team of highly qualified technocrats with vast experience in vertical transportation and passenger flow."
  }},
  {"id":"company","type":"text_image","fields":{
    "label":"The Company",
    "title":"Building Trust Through Quality & Service",
    "paragraphs":["We are pleased to introduce Rising Star Elevator Pvt. Limited (RSEPL) as a growing organization in the field of Technical Services and Passenger Free Flow. The organization is managed by a team of highly qualified technocrats having vast experience, supported by an experienced team of engineers and technicians well trained in the field of installation and after sales services.","The complete team of RSEPL is committed to provide complete customer satisfaction. We are here to build & develop long term business associations with all our customers. Since we are a developing organization and value the customer services & satisfaction most, you would observe that we are competitively priced — indicative of the fact that we do not operate on hefty margins but offer Quality Equipment And Services at affordable prices."],
    "image":"/assets/elevator-1.jpeg",
    "image_secondary":"/assets/elevator-2.jpeg"
  }},
  {"id":"vision_values","type":"cards","fields":{
    "label":"Our Guiding Principles",
    "title":"Vision, Values & Mission",
    "vision":"To change the expectation of the customers by raising their expectations to the next level of demand in terms of product, offerings and services. To offer trouble-free performance and unique aesthetics that ensure complete customer satisfaction.",
    "vision_quote":"Raising expectations to the next level",
    "values":["Respectable, honest, ethical and transparent dealings with all customers and vendors.","Dedication to social responsibility and strengthening social status.","Environmental consciousness in all our actions."],
    "values_quote":"Respect, Honesty, Ethics, Transparency",
    "mission":"To offer high quality product with touch & feel technology and to become feel good service provider till infinity. We supply equipment with specifications better than competitors, with pre-defined processes for installation and post-handover services.",
    "mission_quote":"Feel good service provider till infinity"
  }},
  {"id":"business_areas","type":"cards","fields":{
    "label":"Our Expertise",
    "title":"Three Pillars of Our Business",
    "description":"Covering three important areas of construction",
    "items":[
      {"title":"New Equipment Business","description":"Vertical Transportation — complete range of traction elevators & escalators with IS compliance and spares availability."},
      {"title":"Consultancy Services","description":"Optimization evaluation, specification preparation, enquiry calling, technical comparatives, and design approval support."},
      {"title":"Project Management","description":"Completion schedules, agency coordination, site meetings, performance evaluation, and invoice clearance."}
    ]
  }},
  {"id":"timeline","type":"timeline","fields":{
    "label":"Our Journey",
    "title":"Two Decades of Growth",
    "items":[
      {"year":"2005","title":"Foundation","description":"Rising Star Elevator Pvt. Ltd. established by duo of highly qualified professionals"},
      {"year":"2008","title":"First Major Project","description":"Completed 100+ residential elevator installations in Delhi NCR"},
      {"year":"2012","title":"Expansion","description":"Extended services to commercial and hospital segments"},
      {"year":"2015","title":"1000+ Installations","description":"Milestone of 1000+ successful elevator installations achieved"},
      {"year":"2018","title":"ISO Certification","description":"Received ISO 9001 certification for quality management"},
      {"year":"2020","title":"Escalator Division","description":"Launched escalator and moving walk solutions"},
      {"year":"2024","title":"3000+ Installations","description":"Serving across India with 3000+ successful projects"}
    ]
  }},
  {"id":"team","type":"stats","fields":{
    "label":"Our Team",
    "title":"Expert Professionals at Your Service",
    "items":[
      {"value":"2","suffix":"+","label":"Project Managers","description":"Experienced professionals overseeing all projects"},
      {"value":"2","suffix":"+","label":"Site Supervisors","description":"Ensuring quality installation on-site"},
      {"value":"30","suffix":"+","label":"Expert Mechanics","description":"Trained technicians for installation & service"},
      {"value":"5","suffix":"+","label":"Engineers","description":"Technical design and support team"}
    ]
  }},
  {"id":"certifications","type":"list","fields":{
    "label":"Certifications",
    "title":"Quality Assured",
    "items":["IS Code Compliant","ISO 9001:2015","BIS Certified","National Building Code"]
  }}
]}'::jsonb WHERE slug = 'about';

-- Seed CONTACT page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Contact Us",
    "title":"Get in Touch With Our Team",
    "description":"Have a question or need a quote? Our team is ready to help you with all your vertical transportation needs."
  }},
  {"id":"contact-info","type":"contact","fields":{
    "address":"722A, Jaina Tower 2, District Centre Janakpuri, New Delhi - 110058",
    "phone":"+91-8800732223",
    "email":"info@risingstarelevator.com",
    "hours":"Mon - Sat: 9:00 AM - 6:00 PM"
  }},
  {"id":"form","type":"contact_form","fields":{
    "title":"Send Us a Message",
    "description":"Fill out the form below and we will get back to you within 24 hours.",
    "submit_text":"Send Message"
  }}
]}'::jsonb WHERE slug = 'contact';

-- Seed SERVICES page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Our Services",
    "title":"Complete Elevator Service Solutions",
    "description":"From annual maintenance to complete modernization, we provide comprehensive elevator services across India."
  }},
  {"id":"services_list","type":"services_grid","fields":{
    "items":[
      {"title":"Annual Maintenance Contract","slug":"amc","description":"Comprehensive maintenance programs to keep your elevators running at peak performance with regular inspections and preventive care.","features":["Monthly Inspections","Parts Replacement","Safety Audits","Priority Support"]},
      {"title":"Maintenance & Servicing","slug":"maintenance","description":"Regular maintenance services to ensure smooth operation, safety compliance, and extended equipment lifespan.","features":["Routine Checks","Lubrication","Component Testing","Performance Tuning"]},
      {"title":"Repair Services","slug":"repair","description":"Quick response repair services for all types of elevator breakdowns with 24/7 emergency support.","features":["Emergency Response","Breakdown Repair","Parts Supply","Fault Diagnosis"]},
      {"title":"Modernization","slug":"modernization","description":"Upgrade your existing elevator systems with latest technology for improved performance and safety.","features":["Control Upgrades","Door Systems","Safety Features","Energy Efficiency"]},
      {"title":"Customization","slug":"customization","description":"Custom elevator solutions tailored to your specific requirements, aesthetics, and building specifications.","features":["Custom Cabins","Special Finishes","Unique Designs","Bespoke Solutions"]}
    ]
  }},
  {"id":"why_us","type":"features","fields":{
    "label":"Why Choose Our Services",
    "title":"Service Excellence Guaranteed",
    "items":[
      {"title":"Certified Technicians","description":"All our service engineers are factory trained and certified."},
      {"title":"Genuine Parts","description":"We use only genuine OEM parts for all repairs and maintenance."},
      {"title":"24/7 Availability","description":"Emergency support available round the clock, every day."},
      {"title":"Transparent Pricing","description":"No hidden costs. Clear pricing for all service packages."}
    ]
  }}
]}'::jsonb WHERE slug = 'services';

-- Seed PRODUCTS page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Our Products",
    "title":"Premium Elevator & Escalator Range",
    "description":"Discover our complete range of vertical transportation solutions designed for every need — from elegant home lifts to high-capacity commercial elevators."
  }},
  {"id":"categories","type":"products_grid","fields":{
    "items":[
      {"name":"Home Lifts","slug":"home-lift","category":"Residential","description":"Elegant, compact elevators designed for modern homes with premium aesthetics and smooth operation.","specs":["2-6 Persons","Up to 4 Stops","MRL Technology"]},
      {"name":"Passenger Elevators","slug":"passenger-elevator","category":"Commercial","description":"High-performance MRL gearless elevators for commercial buildings, offices, and shopping complexes.","specs":["6-20 Persons","Up to 20 Stops","High Speed"]},
      {"name":"Hospital Elevators","slug":"hospital-elevator","category":"Specialized","description":"Spacious bed-size elevators with smooth ride quality designed specifically for healthcare facilities.","specs":["Bed Size Cabin","Smooth Operation","Emergency Features"]},
      {"name":"Capsule Elevators","slug":"capsule-elevator","category":"Premium","description":"Stunning panoramic glass elevators that add architectural beauty to any building.","specs":["Glass Cabin","Panoramic View","Custom Design"]},
      {"name":"Goods Elevators","slug":"goods-elevator","category":"Industrial","description":"Heavy-duty freight elevators for warehouses, factories, and industrial facilities.","specs":["Up to 5000 Kg","Industrial Grade","Heavy Duty"]},
      {"name":"Escalators","slug":"escalator","category":"Transport","description":"Premium escalators and moving walkways for malls, airports, and commercial spaces.","specs":["Indoor/Outdoor","Energy Saving","High Traffic"]}
    ]
  }},
  {"id":"cta","type":"cta","fields":{
    "title":"Need a Custom Solution?",
    "description":"Our engineering team can design and deliver elevator solutions tailored to your specific requirements.",
    "cta_text":"Request Custom Quote",
    "cta_link":"/get-quote"
  }}
]}'::jsonb WHERE slug = 'products';

-- Seed GALLERY page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Gallery",
    "title":"Our Elevator Installations",
    "description":"Browse through our portfolio of completed elevator installations across residential, commercial, and industrial projects."
  }},
  {"id":"gallery","type":"gallery","fields":{
    "images":[
      {"src":"/assets/elevator-1.jpeg","alt":"Premium elevator interior with gold finish"},
      {"src":"/assets/elevator-2.jpeg","alt":"Modern residential elevator"},
      {"src":"/assets/elevator-3.jpeg","alt":"Commercial elevator installation"},
      {"src":"/assets/elevator-4.jpeg","alt":"Hospital elevator system"},
      {"src":"/assets/elevator-5.jpeg","alt":"Luxury capsule elevator"}
    ]
  }},
  {"id":"videos","type":"video_gallery","fields":{
    "label":"Video Gallery",
    "title":"See Our Elevators in Action",
    "videos":[
      {"src":"/videos/elevator-video-1.mp4","title":"Home Lift Installation"},
      {"src":"/videos/elevator-video-2.mp4","title":"Commercial Elevator"},
      {"src":"/videos/elevator-video-3.mp4","title":"Hospital Elevator"},
      {"src":"/videos/elevator-video-4.mp4","title":"Capsule Elevator"},
      {"src":"/videos/elevator-video-5.mp4","title":"Goods Elevator"},
      {"src":"/videos/elevator-video-6.mp4","title":"Escalator Installation"},
      {"src":"/videos/elevator-video-7.mp4","title":"Modernization Project"},
      {"src":"/videos/elevator-video-8.mp4","title":"MRL Elevator"}
    ]
  }}
]}'::jsonb WHERE slug = 'gallery';

-- Seed PROJECTS page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Projects",
    "title":"Our Activities",
    "description":"3000+ successful installations across India."
  }},
  {"id":"projects","type":"projects_grid","fields":{
    "items":[
      {"name":"Wave Infratech","location":"Noida","type":"Commercial","specs":"Multiple MRL Elevators","status":"Completed"},
      {"name":"Parker Estate Developers","location":"Sonepat","type":"Mixed Use","specs":"1500Kgs MRL-Gearless, 3 stops","status":"Completed"},
      {"name":"Gurgaon Residential","location":"Gurgaon","type":"Residential","specs":"408 Kgs, 4 stops","status":"Completed"},
      {"name":"Faridabad Residential","location":"Faridabad","type":"Residential","specs":"408 Kgs, 4 stops","status":"Completed"},
      {"name":"Delhi East Residential","location":"Delhi","type":"Residential","specs":"340 Kgs, 5 stops","status":"Completed"},
      {"name":"Parker Residency Upgrade","location":"Sonepat","type":"Modernization","specs":"Complete system upgrade","status":"Completed"}
    ]
  }}
]}'::jsonb WHERE slug = 'projects';

-- Seed GET QUOTE page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Get a Quote",
    "title":"Request Your Free Elevator Quote",
    "description":"Tell us about your requirements and get a customized quote within 24 hours."
  }},
  {"id":"form","type":"quote_form","fields":{
    "title":"Fill in Your Details",
    "submit_text":"Submit Quote Request"
  }}
]}'::jsonb WHERE slug = 'get-quote';

-- Seed BLOG page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Blog",
    "title":"Elevator Industry Insights",
    "description":"Stay updated with the latest trends, tips, and news from the elevator industry."
  }},
  {"id":"posts","type":"blog_grid","fields":{
    "posts":[
      {"title":"How to Choose the Right Elevator for Your Building","slug":"choose-right-elevator","excerpt":"A comprehensive guide to selecting the perfect elevator system based on building type, capacity needs, and budget.","date":"2024-01-15","category":"Guide","image":"/assets/elevator-1.jpeg"},
      {"title":"Elevator Safety Tips Every Building Owner Should Know","slug":"elevator-safety-tips","excerpt":"Essential safety guidelines and maintenance practices to ensure your elevator operates safely and reliably.","date":"2024-02-10","category":"Safety","image":"/assets/elevator-2.jpeg"},
      {"title":"The Future of Elevator Technology in India","slug":"future-elevator-technology","excerpt":"Exploring emerging trends like IoT-enabled elevators, machine learning predictive maintenance, and green elevator solutions.","date":"2024-03-05","category":"Technology","image":"/assets/elevator-3.jpeg"}
    ]
  }}
]}'::jsonb WHERE slug = 'blog';

-- Seed VISION MISSION page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Vision & Mission",
    "title":"Our Guiding Principles",
    "description":"Driven by innovation and committed to excellence in vertical transportation."
  }},
  {"id":"vision","type":"text_image","fields":{
    "title":"Our Vision",
    "content":"To change the expectation of the customers by raising their expectations to the next level of demand in terms of product, offerings and services. To offer trouble-free performance and unique aesthetics that ensure complete customer satisfaction.",
    "highlight":"Raising expectations to the next level"
  }},
  {"id":"mission","type":"text_image","fields":{
    "title":"Our Mission",
    "content":"To offer high quality product with touch & feel technology and to become feel good service provider till infinity. We supply equipment with specifications better than competitors, with pre-defined processes for installation and post-handover services.",
    "highlight":"Feel good service provider till infinity"
  }},
  {"id":"values","type":"list","fields":{
    "title":"Our Core Values",
    "items":["Respectable, honest, ethical and transparent dealings with all customers and vendors","Dedication to social responsibility and strengthening social status","Environmental consciousness in all our actions","Commitment to quality and continuous improvement","Customer satisfaction above all"]
  }},
  {"id":"commitments","type":"list","fields":{
    "title":"Our Commitments",
    "items":["Highest quality equipment at competitive prices","IS Code compliant installations","24/7 customer support","Genuine spare parts availability","Regular maintenance and safety audits","Skilled and trained workforce"]
  }}
]}'::jsonb WHERE slug = 'vision-mission';

-- Seed BUSINESS STRATEGY page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Business Strategy",
    "title":"Our Strategic Approach",
    "description":"A comprehensive approach to delivering excellence in vertical transportation across India."
  }},
  {"id":"overview","type":"text_image","fields":{
    "title":"Strategic Overview",
    "content":"Rising Star Elevator operates with a clear strategic vision focused on three core business areas: New Equipment Business, Consultancy Services, and Project Management. This tri-pillar approach allows us to serve our clients comprehensively across the entire lifecycle of their vertical transportation needs."
  }},
  {"id":"pillars","type":"cards","fields":{
    "title":"Three Pillars of Business",
    "items":[
      {"title":"New Equipment Business","description":"Complete range of traction elevators and escalators with IS compliance, spares availability, and after-sales service."},
      {"title":"Consultancy Services","description":"Optimization evaluation, specification preparation, enquiry calling, technical comparatives, and design approval support."},
      {"title":"Project Management","description":"Completion schedules, agency coordination, site meetings, performance evaluation, and invoice clearance."}
    ]
  }}
]}'::jsonb WHERE slug = 'business-strategy';

-- Seed NEW EQUIPMENT page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"New Equipment",
    "title":"New Elevator Equipment Solutions",
    "description":"Complete range of new elevator and escalator equipment for all building types."
  }},
  {"id":"overview","type":"text_image","fields":{
    "title":"New Equipment Business",
    "content":"Rising Star Elevator offers a complete range of new traction elevators and escalators designed to meet the needs of residential, commercial, hospital, and industrial buildings. All our equipment is IS Code compliant with genuine spares availability and comprehensive after-sales service."
  }},
  {"id":"offerings","type":"cards","fields":{
    "title":"Our Equipment Range",
    "items":[
      {"title":"MRL Gearless Elevators","description":"Modern machine-room-less elevators with energy-efficient permanent magnet motors."},
      {"title":"Geared Traction Elevators","description":"Reliable geared elevators for mid-rise buildings with excellent performance."},
      {"title":"Hydraulic Elevators","description":"Smooth hydraulic systems ideal for low-rise buildings and home installations."},
      {"title":"Escalators & Moving Walks","description":"Premium escalators and moving walkways for high-traffic commercial spaces."}
    ]
  }}
]}'::jsonb WHERE slug = 'new-equipment';

-- Seed PRODUCT FEATURES page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Product Features",
    "title":"10 Essential Safety Features",
    "description":"Every Rising Star elevator comes equipped with advanced safety features that exceed industry standards."
  }},
  {"id":"features","type":"features","fields":{
    "title":"Safety Features",
    "items":[
      {"number":"01","title":"Microprocessor Controller","description":"Advanced microprocessor-based control system for precise floor leveling and smooth operation."},
      {"number":"02","title":"Infrared Door Curtain","description":"Full-height infrared curtain preventing door closing on passengers for enhanced safety."},
      {"number":"03","title":"Emergency Rescue Device","description":"Automatic rescue device that brings the elevator to the nearest floor during power failure."},
      {"number":"04","title":"Overload Protection","description":"Electronic overload sensor preventing operation when capacity is exceeded."},
      {"number":"05","title":"Fire-Rated Doors","description":"Fire-resistant landing doors meeting all fire safety regulations."},
      {"number":"06","title":"Intercom System","description":"Two-way communication system connecting passengers with building management."},
      {"number":"07","title":"CCTV Integration","description":"Built-in camera support for security monitoring inside the elevator cabin."},
      {"number":"08","title":"Anti-Nuisance Feature","description":"Prevents unnecessary stops by canceling fake calls in the system."},
      {"number":"09","title":"Emergency Lighting","description":"Battery-operated emergency lighting activating during power outages."},
      {"number":"10","title":"Seismic Sensor","description":"Automatic detection and response system for earthquake safety."}
    ]
  }}
]}'::jsonb WHERE slug = 'product-features';

-- Seed SITEMAP page content
UPDATE pages SET content = '{"sections":[
  {"id":"hero","type":"hero","fields":{
    "label":"Sitemap",
    "title":"Website Sitemap",
    "description":"Find all pages and sections of our website."
  }}
]}'::jsonb WHERE slug = 'sitemap';
