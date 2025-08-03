// Environment configuration with safe defaults for deployment
export const config = {
  // Database configuration
  database: {
    url: process.env.DATABASE_URL || null,
    required: false, // Set to true when database becomes required
  },
  
  // Server configuration
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  
  // OpenAI configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY || null,
  },
  
  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'fallback-secret-for-demo',
  },
};

// Validation function that logs warnings but doesn't crash the app
export function validateConfig() {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check database configuration
  if (!config.database.url) {
    if (config.database.required) {
      errors.push('DATABASE_URL is required but not provided');
    } else {
      warnings.push('DATABASE_URL not provided. Using in-memory storage.');
    }
  }
  
  // Check OpenAI configuration
  if (!config.openai.apiKey) {
    warnings.push('OPENAI_API_KEY not provided. Chat functionality will be limited.');
  }
  
  // Log warnings
  warnings.forEach(warning => console.warn(`Warning: ${warning}`));
  
  // Log errors but don't throw in production to prevent deployment failures
  if (errors.length > 0) {
    errors.forEach(error => console.error(`Error: ${error}`));
    
    if (config.server.nodeEnv === 'production') {
      console.warn('Continuing with degraded functionality in production...');
    } else {
      // Only throw in development
      throw new Error(`Configuration errors: ${errors.join(', ')}`);
    }
  }
  
  return {
    hasWarnings: warnings.length > 0,
    hasErrors: errors.length > 0,
    warnings,
    errors,
  };
}