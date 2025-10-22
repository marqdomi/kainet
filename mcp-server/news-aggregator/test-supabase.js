#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  try {
    // Test 1: Check if table exists and get schema
    console.log('1️⃣ Checking blog_posts table...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Table query error:', tableError.message);
      console.error('   This might mean the table doesn\'t exist or has permission issues');
      return;
    }

    console.log('✅ Table exists and is accessible');

    // Test 2: Try inserting a test record
    console.log('\n2️⃣ Attempting test insert...');
    const testPost = {
      slug: `test-${Date.now()}`,
      title: 'Test Post',
      excerpt: 'This is a test',
      content: '<p>Test content</p>',
      author: 'TEST',
      category: 'Test',
      featured: false,
      read_time: '5 min',
      date: new Date().toISOString().split('T')[0],
    };

    const { data: insertData, error: insertError } = await supabase
      .from('blog_posts')
      .insert([testPost])
      .select();

    if (insertError) {
      console.error('❌ Insert error:', insertError.message);
      if (insertError.details) console.error('   Details:', insertError.details);
      if (insertError.hint) console.error('   Hint:', insertError.hint);
      return;
    }

    console.log('✅ Insert successful');
    console.log('   Inserted ID:', insertData[0]?.id);
    console.log('   Full record:', insertData[0]);

    // Test 3: Try reading it back
    console.log('\n3️⃣ Reading inserted record back...');
    const { data: readData, error: readError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', testPost.slug)
      .single();

    if (readError) {
      console.error('❌ Read error:', readError.message);
      return;
    }

    console.log('✅ Record retrieved successfully');
    console.log('   Title:', readData.title);

    // Test 4: Clean up
    console.log('\n4️⃣ Cleaning up test record...');
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('slug', testPost.slug);

    if (deleteError) {
      console.error('⚠️  Could not delete test record:', deleteError.message);
    } else {
      console.log('✅ Test record deleted');
    }

    console.log('\n✅ ALL TESTS PASSED');
    console.log('\nYour Supabase setup is working correctly!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection();
