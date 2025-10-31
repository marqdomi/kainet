#!/usr/bin/env node

/**
 * Script para probar la API key de Gemini
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API key...\n');
  
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    process.exit(1);
  }
  
  if (apiKey === 'TU_NUEVA_API_KEY_AQUI') {
    console.error('❌ Please replace TU_NUEVA_API_KEY_AQUI with your actual API key');
    process.exit(1);
  }
  
  console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}`);
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    console.log('🤖 Testing with simple prompt...');
    
    const result = await model.generateContent('Say "Hello, API key is working!" in Spanish');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API Response:', text);
    console.log('\n🎉 Gemini API key is working correctly!');
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    
    if (error.message.includes('API key expired')) {
      console.log('\n🔧 Solution: Generate a new API key at https://aistudio.google.com/app/apikeys');
    } else if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n🔧 Solution: Check that your API key is correct');
    }
    
    process.exit(1);
  }
}

testGeminiAPI();