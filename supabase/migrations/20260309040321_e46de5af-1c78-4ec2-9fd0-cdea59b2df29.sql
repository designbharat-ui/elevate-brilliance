-- Add parent_slug and is_visible columns to pages table
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS parent_slug TEXT;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- Seed product detail pages (13 products)
INSERT INTO public.pages (title, slug, parent_slug, status, is_visible, page_order, content, meta_title, meta_description) VALUES
('Home Lift', 'home-lift', 'products', 'published', true, 1, 
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Premium Home Lift Solutions", "subtitle": "Elegant Residential Elevators", "description": "Transform your home with our luxury home lifts designed for comfort, safety, and style.", "label": "Residential Elevator", "image": "/placeholder.svg"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Technical Specifications", "items": [{"title": "Capacity", "description": "4-6 Passengers"}, {"title": "Speed", "description": "Up to 1.0 m/s"}, {"title": "Load", "description": "320-450 Kgs"}]}},
  {"id": "features", "type": "list", "fields": {"title": "Key Features", "items": ["Compact design for homes", "Energy efficient", "Silent operation", "Emergency backup", "Custom cabin design"]}}
]}'::jsonb, 
'Home Lift India - Premium Residential Elevators', 
'Elegant home lifts for villas and bungalows. Compact design, silent operation, custom interiors. IS-compliant residential elevators.'),

('Passenger Lift', 'passenger-lift', 'products', 'published', true, 2,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "High-Performance Passenger Lifts", "subtitle": "Commercial & Residential", "description": "Reliable passenger elevators for buildings of all sizes.", "label": "Passenger Elevator"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Technical Specifications", "items": [{"title": "Capacity", "description": "8-24 Passengers"}, {"title": "Speed", "description": "Up to 1.5 m/s"}, {"title": "Load", "description": "630-1600 Kgs"}]}}
]}'::jsonb,
'Passenger Lift - Commercial Elevator Solutions',
'High-performance passenger lifts for commercial and residential buildings. 8-24 passengers capacity, energy efficient, IS-compliant.'),

('Hospital Lift', 'hospital-lift', 'products', 'published', true, 3,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Medical-Grade Hospital Lifts", "subtitle": "Stretcher Compatible Elevators", "description": "Specially designed elevators for healthcare facilities.", "label": "Medical Elevator"}},
  {"id": "features", "type": "list", "fields": {"title": "Hospital-Specific Features", "items": ["Stretcher compatible", "Smooth ride quality", "Emergency power backup", "Antibacterial surfaces", "Wide door opening"]}}
]}'::jsonb,
'Hospital Lift - Medical Elevator Systems',
'Medical-grade hospital lifts with stretcher compatibility. Smooth operation, antibacterial surfaces, emergency backup. Healthcare facility elevators.'),

('Capsule Lift', 'capsule-lift', 'products', 'published', true, 4,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Panoramic Capsule Lifts", "subtitle": "Glass Cabin Elevators", "description": "Stunning glass elevators that offer panoramic views.", "label": "Premium Design"}},
  {"id": "features", "type": "list", "fields": {"title": "Capsule Lift Features", "items": ["360° glass cabin", "LED lighting", "Outdoor/Indoor installation", "Weather resistant", "Architectural appeal"]}}
]}'::jsonb,
'Capsule Lift - Panoramic Glass Elevators',
'Premium capsule lifts with panoramic glass design. 360° views, LED lighting, architectural appeal. Indoor & outdoor installation.'),

('MRL Lift', 'mrl-lift', 'products', 'published', true, 5,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Machine Room Less (MRL) Lifts", "subtitle": "Modern Space-Saving Technology", "description": "Advanced MRL technology for maximum space efficiency.", "label": "Space Saving"}},
  {"id": "features", "type": "list", "fields": {"title": "MRL Benefits", "items": ["No machine room required", "Energy efficient", "Lower installation cost", "Compact design", "Modern technology"]}}
]}'::jsonb,
'MRL Lift - Machine Room Less Elevators',
'Machine Room Less (MRL) lifts with space-saving design. Energy efficient, lower installation cost, modern technology. IS-compliant.'),

('Freight Lift', 'freight-lift', 'products', 'published', true, 6,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Heavy-Duty Freight Lifts", "subtitle": "Goods Transportation", "description": "Industrial elevators for transporting heavy materials and goods.", "label": "Industrial"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Specifications", "items": [{"title": "Capacity", "description": "500-4000 Kgs"}, {"title": "Speed", "description": "Up to 0.5 m/s"}, {"title": "Type", "description": "Goods Only"}]}}
]}'::jsonb,
'Freight Lift - Heavy Duty Goods Elevator',
'Industrial freight lifts for heavy-duty goods transportation. 500-4000 Kgs capacity. Durable construction, reliable operation.'),

('High Rise Elevators', 'high-rise', 'products', 'published', true, 7,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "High-Speed High Rise Elevators", "subtitle": "For Tall Buildings & Towers", "description": "Advanced elevators for skyscrapers and tall buildings.", "label": "High Speed"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Specifications", "items": [{"title": "Speed", "description": "Up to 6 m/s"}, {"title": "Capacity", "description": "13-21 Passengers"}, {"title": "Travel", "description": "50+ Floors"}]}}
]}'::jsonb,
'High Rise Elevator - High Speed Lifts for Tall Buildings',
'High-speed elevators for tall buildings and towers. Up to 6 m/s speed, 50+ floors. Advanced control systems, smooth operation.'),

('Dumb Waiter', 'dumb-waiter', 'products', 'published', true, 8,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Service Dumb Waiters", "subtitle": "Small Goods Lift", "description": "Compact lifts for restaurants, hotels, and kitchens.", "label": "Service Lift"}},
  {"id": "features", "type": "list", "fields": {"title": "Applications", "items": ["Restaurants", "Hotels", "Hospitals", "Libraries", "Commercial kitchens"]}}
]}'::jsonb,
'Dumb Waiter - Service Lift for Restaurants & Hotels',
'Compact dumb waiters for restaurants, hotels, and commercial kitchens. Food & goods transportation. Hygienic, efficient, space-saving.'),

('Escalator', 'escalator', 'products', 'published', true, 9,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Modern Escalators", "subtitle": "Moving Stairs Solutions", "description": "High-quality escalators for malls, metro stations, and public spaces.", "label": "Transit"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Specifications", "items": [{"title": "Type", "description": "Indoor & Outdoor"}, {"title": "Speed", "description": "0.5 m/s"}, {"title": "Capacity", "description": "6000+ persons/hour"}]}}
]}'::jsonb,
'Escalator - Moving Stairs for Malls & Metro',
'Modern escalators for shopping malls, metro stations, airports. Indoor & outdoor models. High capacity, energy efficient, safe operation.'),

('Moving Walk', 'moving-walk', 'products', 'published', true, 10,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Horizontal Moving Walkways", "subtitle": "Passenger Transportation", "description": "Moving walkways for airports, malls, and transit hubs.", "label": "Transit System"}},
  {"id": "features", "type": "list", "fields": {"title": "Features", "items": ["Horizontal transportation", "Indoor & outdoor", "Variable speed", "Anti-slip surface", "Energy saving mode"]}}
]}'::jsonb,
'Moving Walk - Horizontal Transportation Systems',
'Moving walkways for airports, malls, and transit hubs. Smooth horizontal transportation. Anti-slip surface, energy efficient.'),

('Automobile Elevator', 'automobile-elevator', 'products', 'published', true, 11,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Car Parking Elevators", "subtitle": "Vehicle Transportation", "description": "Heavy-duty elevators for car parking systems.", "label": "Specialty"}},
  {"id": "specs", "type": "cards", "fields": {"title": "Specifications", "items": [{"title": "Capacity", "description": "2000-5000 Kgs"}, {"title": "Type", "description": "Vehicle Transport"}, {"title": "Application", "description": "Parking Systems"}]}}
]}'::jsonb,
'Automobile Elevator - Car Parking Lift Systems',
'Heavy-duty car parking elevators for automated parking systems. 2000-5000 Kgs capacity. Efficient vehicle transportation.'),

('Gearless Home Lift', 'gearless-home-lift', 'products', 'published', true, 12,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Gearless Home Lifts", "subtitle": "Silent Technology", "description": "Ultra-quiet gearless technology for luxury homes.", "label": "Premium"}},
  {"id": "features", "type": "list", "fields": {"title": "Advantages", "items": ["Ultra quiet operation", "Low maintenance", "Energy efficient", "Smooth ride", "Premium quality"]}}
]}'::jsonb,
'Gearless Home Lift - Silent Premium Elevators',
'Premium gearless home lifts with ultra-quiet operation. Low maintenance, energy efficient, smooth ride. Luxury residential elevators.'),

('Hydraulic Home Lift', 'hydraulic-home-lift', 'products', 'published', true, 13,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Hydraulic Home Lifts", "subtitle": "Cost-Effective Solution", "description": "Reliable hydraulic elevators for low-rise homes.", "label": "Affordable"}},
  {"id": "features", "type": "list", "fields": {"title": "Benefits", "items": ["Cost effective", "Low rise buildings", "Simple maintenance", "Reliable operation", "Proven technology"]}}
]}'::jsonb,
'Hydraulic Home Lift - Cost Effective Residential Elevator',
'Cost-effective hydraulic home lifts for low-rise buildings. Reliable operation, simple maintenance, proven technology. Affordable solution.')
ON CONFLICT (slug) DO NOTHING;

-- Seed service detail pages (5 services)
INSERT INTO public.pages (title, slug, parent_slug, status, is_visible, page_order, content, meta_title, meta_description) VALUES
('AMC Services', 'amc', 'services', 'published', true, 1,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Annual Maintenance Contracts", "subtitle": "AMC Services", "description": "Comprehensive annual maintenance contracts for worry-free elevator operation.", "label": "Maintenance"}},
  {"id": "benefits", "type": "list", "fields": {"title": "AMC Benefits", "items": ["Regular preventive maintenance", "24/7 emergency support", "Priority service", "Cost-effective", "Extended equipment life"]}},
  {"id": "includes", "type": "cards", "fields": {"title": "What''s Included", "items": [{"title": "Inspection", "description": "Monthly safety inspections"}, {"title": "Servicing", "description": "Regular lubrication & adjustments"}, {"title": "Support", "description": "24/7 helpline"}]}}
]}'::jsonb,
'AMC Services - Annual Maintenance Contract for Elevators',
'Comprehensive AMC services for elevators. Regular maintenance, 24/7 support, priority service. Cost-effective annual contracts for lifts.'),

('Maintenance Services', 'maintenance', 'services', 'published', true, 2,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Elevator Maintenance Services", "subtitle": "Regular Servicing", "description": "Professional maintenance services to keep your elevators running smoothly.", "label": "Servicing"}},
  {"id": "services", "type": "list", "fields": {"title": "Maintenance Services", "items": ["Preventive maintenance", "Safety inspections", "Parts replacement", "Performance optimization", "Compliance checks"]}}
]}'::jsonb,
'Elevator Maintenance Services - Regular Lift Servicing',
'Professional elevator maintenance services. Preventive maintenance, safety inspections, parts replacement. Keep your lifts running smoothly.'),

('Repair Services', 'repair', 'services', 'published', true, 3,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Quick Repair Services", "subtitle": "Emergency Repairs", "description": "Fast and reliable repair services for all types of elevators.", "label": "Emergency"}},
  {"id": "features", "type": "cards", "fields": {"title": "Our Capabilities", "items": [{"title": "Fast Response", "description": "2-4 hour response time"}, {"title": "Expert Team", "description": "Certified technicians"}, {"title": "Genuine Parts", "description": "OEM quality parts"}]}}
]}'::jsonb,
'Elevator Repair Services - Emergency Lift Repairs',
'Quick elevator repair services. 2-4 hour response time, certified technicians, genuine parts. Emergency breakdown repairs for all lift types.'),

('Modernization', 'modernization', 'services', 'published', true, 4,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Elevator Modernization", "subtitle": "Upgrade Your Lifts", "description": "Upgrade old elevators with modern technology and safety features.", "label": "Upgrades"}},
  {"id": "upgrades", "type": "list", "fields": {"title": "Modernization Services", "items": ["Control system upgrades", "Door operator replacement", "Cabin interior renovation", "Safety feature addition", "Energy efficiency improvements"]}}
]}'::jsonb,
'Elevator Modernization - Lift Upgrade Services',
'Elevator modernization and upgrade services. Control systems, door operators, cabin interiors, safety features. Make old lifts modern.'),

('Customization', 'customization', 'services', 'published', true, 5,
'{"sections": [
  {"id": "hero", "type": "hero", "fields": {"title": "Custom Elevator Solutions", "subtitle": "Bespoke Design", "description": "Tailored elevator solutions designed specifically for your requirements.", "label": "Custom"}},
  {"id": "options", "type": "cards", "fields": {"title": "Customization Options", "items": [{"title": "Cabin Design", "description": "Custom interiors"}, {"title": "Finishes", "description": "Premium materials"}, {"title": "Controls", "description": "Smart systems"}]}}
]}'::jsonb,
'Custom Elevator Solutions - Bespoke Lift Design',
'Custom elevator solutions tailored to your needs. Bespoke cabin design, premium finishes, smart controls. Personalized lift solutions.')
ON CONFLICT (slug) DO NOTHING;