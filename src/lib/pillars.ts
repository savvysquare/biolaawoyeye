export const mapToPillar = (cat: string) => {
  if (!cat) return "Infrastructure";
  const c = cat.toLowerCase();
  
  if (c.includes("education") || c.includes("school") || c.includes("scholarship")) {
    return "Education";
  }
  
  if (c.includes("health") || c.includes("medical") || c.includes("oshi") || c.includes("ohis") || c.includes("wheelchair")) {
    return "Healthcare";
  }
  
  if (c.includes("security") || c.includes("vigilante") || c.includes("safety")) {
    return "Security";
  }
  
  if (
    c.includes("empowerment") || 
    c.includes("sme") || 
    c.includes("youth") || 
    c.includes("sports") || 
    c.includes("special") || 
    c.includes("business") || 
    c.includes("artisan") || 
    c.includes("grant") ||
    c.includes("trade") ||
    c.includes("equipment")
  ) {
    return "SME Support";
  }
  
  // Default for water, electricity, roads, etc.
  return "Infrastructure";
};

export const PILLARS = ["Education", "Healthcare", "Infrastructure", "Security", "SME Support"] as const;
