"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
// import React, { useMemo } from 'react';

const WEEKDAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
const DEFAULT_COLORS = ["#6FA8DC", "#7BC96F", "#F4A261", "#C084FC", "#EC4899", "#3B82F6", "#10B981", "#9CA3AF"];

// 1. ضع كود الـ SVG في مكون مستقل
const MySvgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48" height="48">
    <style>
      {`
        .float{animation:float 2s ease-in-out infinite;}
        @keyframes float{50%{transform:translateY(-3px);}}
        .eye{animation:blink 4s infinite;transform-origin:center;}
        @keyframes blink{0%,90%,100%{transform:scaleY(1);}95%{transform:scaleY(.2);}}
      `}
    </style>
    <g class="float">
      <rect x="18" y="5" width="10" height="22" rx="5" fill="#fff1f8"/>
      <rect x="36" y="5" width="10" height="22" rx="5" fill="#fff1f8"/>
      <rect x="21" y="9" width="4" height="13" fill="#ffb6d9"/>
      <rect x="39" y="9" width="4" height="13" fill="#ffb6d9"/>
      <rect x="8" y="25" width="14" height="12" fill="#ff9fd5"/>
      <rect x="42" y="25" width="14" height="12" fill="#ff9fd5"/>
      <rect x="27" y="27" width="10" height="10" fill="#ff5da8"/>
      <rect x="16" y="22" width="32" height="32" rx="12" fill="#fffafc"/>
      <g class="eye" fill="#593550">
        <rect x="24" y="34" width="5" height="8"/>
        <rect x="35" y="34" width="5" height="8"/>
      </g>
      <rect x="25" y="34" width="2" height="2" fill="white"/>
      <rect x="36" y="34" width="2" height="2" fill="white"/>
      <rect x="19" y="43" width="6" height="3" fill="#ffb6d9"/>
      <rect x="39" y="43" width="6" height="3" fill="#ffb6d9"/>
      <rect x="29" y="45" width="7" height="3" fill="#ff7bae"/>
      <rect x="25" y="50" width="14" height="8" fill="#cfa8ff"/>
      <rect x="31" y="50" width="2" height="8" fill="#fff"/>
      <g fill="#ffe88a">
        <rect x="5" y="15" width="4" height="4"/>
        <rect x="55" y="18" width="4" height="4"/>
      </g>
    </g>
  </svg>
);
 

const CutePlannerBunnyIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .bunny-float { animation: bunnyFloat 2.8s ease-in-out infinite; }
          @keyframes bunnyFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .bunny-blink { animation: bunnyBlink 4s infinite; transform-origin: center; }
          @keyframes bunnyBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="bunny-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#f3e8ff" stroke="#d8b4fe" strokeWidth="2"/> */}

        {/* الأذنين الطويلتين للارنب */}
        <rect x="22" y="6" width="6" height="14" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="24" y="10" width="2" height="8" fill="#fbcfe8"/>
        
        <rect x="36" y="6" width="6" height="14" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="38" y="10" width="2" height="8" fill="#fbcfe8"/>

        {/* الرأس */}
        <rect x="18" y="18" width="28" height="20" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* العيون (مع أنيميشن الرمش) */}
        <g class="bunny-blink" fill="#4a4046">
          <rect x="24" y="24" width="4" height="6"/>
          <rect x="36" y="24" width="4" height="6"/>
        </g>

        {/* الخدود الوردية */}
        <rect x="21" y="30" width="5" height="3" fill="#f472b6"/>
        <rect x="38" y="30" width="5" height="3" fill="#f472b6"/>

        {/* الأنف والفم */}
        <rect x="30" y="29" width="4" height="2" fill="#4a4046"/>
        <rect x="31" y="31" width="2" height="2" fill="#4a4046"/>

        {/* أسنان الأنبوبة الصغيرة المميزة */}
        <rect x="30" y="33" width="2" height="2" fill="#ffffff" stroke="#4a4046" strokeWidth="1"/>
        <rect x="32" y="33" width="2" height="2" fill="#ffffff" stroke="#4a4046" strokeWidth="1"/>

        {/* نجوم صغيرة متناثرة ستايل بينترست */}
        <rect x="12" y="14" width="2" height="2" fill="#fbbf24"/>
        <rect x="50" y="18" width="2" height="2" fill="#fbbf24"/>
        <rect x="48" y="44" width="2" height="2" fill="#fbbf24"/>
      </g>
    </svg>
  );


const CutePlannerChartIcon = ()  => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .chart-float { animation: chartFloat 2.6s ease-in-out infinite; }
          @keyframes chartFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .chart-blink { animation: chartBlink 4s infinite; transform-origin: center; }
          @keyframes chartBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="chart-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#fdf4ff" stroke="#f5d0fe" strokeWidth="2"/> */}

        {/* الحلقات العلوية لمخطط التقويم */}
        <rect x="22" y="10" width="4" height="4" fill="#c084fc" stroke="#4a4046" strokeWidth="2"/>
        <rect x="38" y="10" width="4" height="4" fill="#c084fc" stroke="#4a4046" strokeWidth="2"/>

        {/* قاعدة جسم المخطط / التقويم */}
        <rect x="16" y="14" width="32" height="38" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* شريط رأس المخطط الوردي اللطيف */}
        <rect x="18" y="16" width="28" height="8" fill="#fbcfe8" stroke="#4a4046" strokeWidth="2"/>

        {/* خطوط رسم بياني داخل المخطط نازلة للأسفل */}
        <rect x="22" y="32" width="8" height="2" fill="#cbd5e1"/>
        <rect x="22" y="37" width="14" height="2" fill="#cbd5e1"/>
        <rect x="22" y="42" width="10" height="2" fill="#cbd5e1"/>

        {/* وجه كيوت في المنتصف وتحت العيون */}
        <g class="chart-blink" fill="#4a4046">
          <rect x="26" y="32" width="2" height="6"/>
          <rect x="36" y="32" width="2" height="6"/>
        </g>
        <rect x="31" y="38" width="2" height="2" fill="#4a4046"/>

        {/* خدود وردية متوازنة في المنتصف */}
        <rect x="23" y="37" width="3" height="2" fill="#f472b6"/>
        <rect x="38" y="37" width="3" height="2" fill="#f472b6"/>

        {/* قلوب ونجوم جانبية زينة ستايل بينترست */}
        <rect x="10" y="22" width="2" height="2" fill="#fbbf24"/>
        <rect x="52" y="26" width="2" height="2" fill="#f43f5e"/>
      </g>
    </svg>
  );



const KawaiiCatIcon = () => ( 
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48" 
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .float { animation: float 2.5s ease-in-out infinite; }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
          .blink { animation: blink 3s infinite; transform-origin: center; }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .heart-pulse { animation: pulse 1.5s ease-in-out infinite; transform-origin: center; }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}
      </style>

      <g class="float" shapeRendering="crispEdges">
        {/* <circle cx="32" cy="32" r="30" fill="#fff0f5" stroke="#ffccd5" strokeWidth="2"/> */}

        <rect x="16" y="14" width="8" height="6" fill="#f8b195"/>
        <rect x="18" y="10" width="4" height="6" fill="#f8b195"/>
        <rect x="18" y="14" width="4" height="4" fill="#ffb4a2"/>

        <rect x="40" y="14" width="8" height="6" fill="#f8b195"/>
        <rect x="42" y="10" width="4" height="6" fill="#f8b195"/>
        <rect x="42" y="14" width="4" height="4" fill="#ffb4a2"/>

        <rect x="18" y="18" width="28" height="22" fill="#fff" stroke="#3d3a45" strokeWidth="2"/>
        <rect x="16" y="22" width="32" height="16" fill="#fff" stroke="#3d3a45" strokeWidth="2"/>

        <g class="blink" fill="#3d3a45">
          <rect x="23" y="25" width="4" height="6"/>
          <rect x="24" y="24" width="2" height="2" fill="#fff"/>
          <rect x="37" y="25" width="4" height="6"/>
          <rect x="38" y="24" width="2" height="2" fill="#fff"/>
        </g>

        <rect x="20" y="31" width="5" height="3" fill="#ff8fab"/>
        <rect x="39" y="31" width="5" height="3" fill="#ff8fab"/>

        <rect x="30" y="30" width="4" height="2" fill="#3d3a45"/>
        <rect x="29" y="32" width="2" height="2" fill="#3d3a45"/>
        <rect x="33" y="32" width="2" height="2" fill="#3d3a45"/>

        <rect x="22" y="38" width="6" height="4" fill="#fff" stroke="#3d3a45" strokeWidth="2"/>
        <rect x="36" y="38" width="6" height="4" fill="#fff" stroke="#3d3a45" strokeWidth="2"/>

        <g class="heart-pulse" transform="translate(44, 10)">
          <rect x="0" y="2" width="2" height="2" fill="#ff5964"/>
          <rect x="4" y="2" width="2" height="2" fill="#ff5964"/>
          <rect x="1" y="0" width="2" height="2" fill="#ff5964"/>
          <rect x="3" y="0" width="2" height="2" fill="#ff5964"/>
          <rect x="0" y="4" width="6" height="2" fill="#ff5964"/>
          <rect x="1" y="6" width="4" height="2" fill="#ff5964"/>
          <rect x="2" y="8" width="2" height="2" fill="#ff5964"/>
        </g>
      </g>
    </svg>
    );

 const CutePlannerCatIcon = () => ( 

    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="50" 
      height="50"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .planner-float { animation: plannerFloat 2.5s ease-in-out infinite; }
          @keyframes plannerFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .planner-blink { animation: plannerBlink 3.5s infinite; transform-origin: center; }
          @keyframes plannerBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="planner-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة تناسب نوتات البلانر */}
        {/* <circle cx="32" cy="32" r="30" fill="#fffef5" stroke="#ffecb3" strokeWidth="2"/> */}

        {/* الأذنين */}
        <rect x="18" y="14" width="6" height="6" fill="#ffb4a2"/>
        <rect x="20" y="10" width="2" height="6" fill="#ffb4a2"/>
        <rect x="40" y="14" width="6" height="6" fill="#ffb4a2"/>
        <rect x="42" y="10" width="2" height="6" fill="#ffb4a2"/>

        {/* الرأس */}
        <rect x="18" y="18" width="28" height="20" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        
        {/* العيون (مع أنيميشن الرمش) */}
        <g class="planner-blink" fill="#4a4046">
          <rect x="24" y="24" width="4" height="6"/>
          <rect x="36" y="24" width="4" height="6"/>
        </g>

        {/* الخدود الوردية */}
        <rect x="21" y="30" width="5" height="3" fill="#ffc375"/>
        <rect x="38" y="30" width="5" height="3" fill="#ffd175"/>

        {/* الأنف والفم */}
        <rect x="30" y="29" width="4" height="2" fill="#4a4046"/>
        <rect x="31" y="31" width="2" height="2" fill="#4a4046"/>

        {/* كفوف صغيرة بالأسفل */}
        <rect x="22" y="36" width="6" height="4" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="36" y="36" width="6" height="4" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* قلوب صغيرة جانبية ستايل بينترست */}
        <rect x="10" y="18" width="2" height="2" fill="#ff4d6d"/>
        <rect x="12" y="16" width="2" height="2" fill="#ff4d6d"/>
        <rect x="52" y="22" width="2" height="2" fill="#ff4d6d"/>
      </g>
    </svg>
  );

const CutePlannerBookIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .book-float { animation: bookFloat 2.6s ease-in-out infinite; }
          @keyframes bookFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .book-blink { animation: bookBlink 4s infinite; transform-origin: center; }
          @keyframes bookBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="book-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2"/> */}

        {/* الأذنين */}
        <rect x="18" y="6" width="8" height="14" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="21" y="9" width="2" height="8" fill="#a7f3d0"/>
        
        <rect x="38" y="6" width="8" height="14" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="41" y="9" width="2" height="8" fill="#a7f3d0"/>

        {/* الرأس */}
        <rect x="18" y="16" width="28" height="20" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* العيون السعيدة (أو المغمضة بابتسامة ^_^) */}
        <g class="book-blink" fill="#4a4046">
          <rect x="24" y="22" width="4" height="6"/>
          <rect x="36" y="22" width="4" height="6"/>
          {/* لمسة إضاءة صغيرة في العيون */}
          <rect x="25" y="23" width="1" height="2" fill="#ffffff"/>
          <rect x="37" y="23" width="1" height="2" fill="#ffffff"/>
        </g>

        {/* الخدود الوردية */}
        <rect x="21" y="28" width="5" height="3" fill="#34d399"/>
        <rect x="38" y="28" width="5" height="3" fill="#34d399"/>

        {/* الفم السعيد لطيف */}
        <rect x="30" y="27" width="4" height="2" fill="#4a4046"/>
        <rect x="29" y="29" width="2" height="2" fill="#4a4046"/>
        <rect x="33" y="29" width="2" height="2" fill="#4a4046"/>

        {/* الكتاب المفتوح الذي يمسكه بيديه بالأسفل */}
        <rect x="20" y="36" width="24" height="10" fill="#c084fc" stroke="#4a4046" strokeWidth="2"/>
        {/* صفحات الكتاب البيضاء */}
        <rect x="22" y="38" width="10" height="6" fill="#ffffff"/>
        <rect x="32" y="38" width="10" height="6" fill="#ffffff"/>
        {/* خط منتصف الكتاب */}
        <rect x="31" y="38" width="2" height="6" fill="#4a4046"/>

        {/* نجوم صغيرة متناثرة ستايل بينترست */}
        <rect x="10" y="14" width="2" height="2" fill="#facc15"/>
        <rect x="52" y="16" width="2" height="2" fill="#facc15"/>
      </g>
    </svg>
  );

const CutePlannerPlantIcon = () =>(
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .plant-float { animation: plantFloat 2.6s ease-in-out infinite; }
          @keyframes plantFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .leaf-grow { animation: leafGrow 2s ease-in-out infinite; transform-origin: bottom center; }
          @keyframes leafGrow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>

      <g class="plant-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#fefce8" stroke="#fef08a" strokeWidth="2"/> */}

        {/* النبتة وهي تكبر وتتحرك بالأعلى */}
        <g class="leaf-grow">
          {/* الأوراق الناشئة */}
          <rect x="28" y="16" width="8" height="6" fill="#4ade80" stroke="#166534" strokeWidth="2"/>
          <rect x="24" y="20" width="6" height="6" fill="#86efac" stroke="#166534" strokeWidth="2"/>
          <rect x="34" y="20" width="6" height="6" fill="#86efac" stroke="#166534" strokeWidth="2"/>
          
          {/* الساق */}
          <rect x="30" y="26" width="4" height="10" fill="#166534"/>
        </g>

        {/* السيس أو الحوض (مركن النبتة) بوجه كيوت */}
        <rect x="22" y="36" width="20" height="16" fill="#fdba74" stroke="#4a4046" strokeWidth="2"/>
        {/* حافة الحوض العلوي */}
        <rect x="20" y="34" width="24" height="4" fill="#ffedd5" stroke="#4a4046" strokeWidth="2"/>

        {/* ملامح الوجه اللطيفة على الحوض */}
        <rect x="26" y="42" width="2" height="4" fill="#4a4046"/>
        <rect x="36" y="42" width="2" height="4" fill="#4a4046"/>
        <rect x="30" y="44" width="4" height="2" fill="#4a4046"/>

        {/* خدود وردية على الحوض */}
        <rect x="24" y="45" width="3" height="2" fill="#fb7185"/>
        <rect x="37" y="45" width="3" height="2" fill="#fb7185"/>

        {/* نجوم صغيرة متناثرة تعبر عن النمو والبهجة */}
        <rect x="12" y="16" width="2" height="2" fill="#fbbf24"/>
        <rect x="50" y="20" width="2" height="2" fill="#fbbf24"/>
      </g>
    </svg>
  );


const CutePlannerChartIco =() =>
   (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .chart-float { animation: chartFloat 2.6s ease-in-out infinite; }
          @keyframes chartFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .chart-blink { animation: chartBlink 4s infinite; transform-origin: center; }
          @keyframes chartBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="chart-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#fdf4ff" stroke="#f5d0fe" strokeWidth="2"/> */}

        {/* الحلقات العلوية لمخطط التقويم */}
        <rect x="22" y="10" width="4" height="3" fill="#c084fc" stroke="#4a4046" strokeWidth="2"/>
        <rect x="38" y="10" width="4" height="3" fill="#c084fc" stroke="#4a4046" strokeWidth="2"/>

        {/* قاعدة جسم المخطط / التقويم */}
        <rect x="16" y="14" width="32" height="38" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* شريط رأس المخطط الوردي اللطيف */}
        <rect x="18" y="16" width="28" height="8" fill="#fbcfe8" stroke="#4a4046" strokeWidth="2"/>

        {/* خطوط رسم بياني أو جدول مصغر داخل المخطط */}
        <rect x="22" y="32" width="8" height="2" fill="#cbd5e1"/>
        <rect x="22" y="37" width="14" height="2" fill="#cbd5e1"/>
        <rect x="22" y="42" width="10" height="2" fill="#cbd5e1"/>

        {/* وجه كيوت على المخطط */}
        <g class="chart-blink" fill="#4a4046">
          <rect x="26" y="28" width="2" height="6"/>
          <rect x="36" y="28" width="2" height="6"/>
        </g>
        <rect x="31" y="34" width="2" height="2" fill="#4a4046"/>

        {/* خدود وردية */}
        <rect x="23" y="33" width="3" height="2" fill="#f472b6"/>
        <rect x="38" y="33" width="3" height="2" fill="#f472b6"/>

        {/* قلوب ونجوم جانبية زينة ستايل بينترست */}
        <rect x="10" y="22" width="2" height="2" fill="#fbbf24"/>
        <rect x="52" y="26" width="2" height="2" fill="#f43f5e"/>
      </g>
    </svg>
  );

const CutePlannerSearchIcon =() => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      width="48" 
      height="48"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <style>
        {`
          .search-float { animation: searchFloat 2.6s ease-in-out infinite; }
          @keyframes searchFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .search-blink { animation: searchBlink 4s infinite; transform-origin: center; }
          @keyframes searchBlink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
        `}
      </style>

      <g class="search-float" shapeRendering="crispEdges">
        {/* خلفية دائرية ناعمة لستايل بينترست */}
        {/* <circle cx="32" cy="32" r="30" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2"/> */}

        {/* مقبض العدسة المكبرة المائل */}
        <rect x="36" y="36" width="6" height="6" fill="#94a3b8" stroke="#4a4046" strokeWidth="2"/>
        <rect x="42" y="42" width="6" height="6" fill="#64748b" stroke="#4a4046" strokeWidth="2"/>
        <rect x="48" y="48" width="6" height="6" fill="#475569" stroke="#4a4046" strokeWidth="2"/>

        {/* إطار العدسة الدائري (رأس العدسة) */}
        <rect x="14" y="14" width="24" height="24" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="16" y="12" width="20" height="28" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>
        <rect x="12" y="16" width="28" height="20" fill="#ffffff" stroke="#4a4046" strokeWidth="2"/>

        {/* زجاج العدسة الداخلي (لون سماوي فاتح شفاف) */}
        {/* <rect x="18" y="16" width="16" height="16" fill="#bae6fd"/>
        <rect x="16" y="18" width="20" height="12" fill="#bae6fd"/> */}

        {/* وجه كيوت لطيف داخل العدسة المكبرة في المنتصف */}
        <g class="search-blink" fill="#4a4046">
          <rect x="20" y="21" width="2" height="4"/>
          <rect x="28" y="21" width="2" height="4"/>
        </g>
        <rect x="24" y="26" width="2" height="2" fill="#4a4046"/>

        {/* خدود وردية */}
        <rect x="18" y="25" width="3" height="2" fill="#f472b6"/>
        <rect x="30" y="25" width="3" height="2" fill="#f472b6"/>

        {/* نجوم لامعة زينة ستايل بينترست */}
        <rect x="48" y="14" width="2" height="2" fill="#fbbf24"/>
        <rect x="10" y="44" width="2" height="2" fill="#fbbf24"/>
      </g>
    </svg>
  );





// --- تصاميم وتنسيقات الملاحظات الكيوت ---
const NoteStyle1 = { bg: "#FFF0F5", border: "#FBCAD9", tapeColor: "#C8A2C8", headerColor: "#D87093", decoration:  <KawaiiCatIcon/> };
const NoteStyle2 = { bg: "#FFFFF0", border: "#F9E79F", tapeColor: "#E6BF92", headerColor: "#DAA520", decoration:<CutePlannerCatIcon/> }; 
const NoteStyle3 = { bg: "#E6E6FA", border: "#C39BD3", tapeColor: "#C084FC", headerColor: "#8E44AD", decoration:  <CutePlannerBunnyIcon /> };
const NoteStyle4 = { bg: "#E0F6FF", border: "#A9DFBF", tapeColor: "#85C1E9", headerColor: "#2980B9", decoration: <CutePlannerBookIcon/>};
const NoteStyle6 = { bg: "#F0F4FF", border: "#D0E1FD", tapeColor: "#A0C4FF", headerColor: "#3A86EF", decoration: <CutePlannerSearchIcon/> }; // ملاحظة السؤال
const NoteStyleSelfAccount = { bg: "#F4F9F4", border: "#C8E6C9", tapeColor: "#A5D6A7", headerColor: "#2E7D32", decoration: <CutePlannerPlantIcon/> }; // ملاحظة محاسبة النفس






const CuteNoteCard = ({ title, value, onChange, onBlur, styleConfig, icon, customTextColor }) => (
  <div 
    className="card relative rounded-2xl shadow-md border-2 transition-all hover:shadow-lg flex flex-col h-full"
    style={{ backgroundColor: styleConfig.bg, borderColor: styleConfig.border, paddingTop: '35px' }}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-5 rounded opacity-80" style={{ backgroundColor: styleConfig.tapeColor, boxShadow: '1px 1px 2px rgba(0,0,0,0.1)' }} />
    <div className="absolute top-2 right-3 text-xl opacity-90">{styleConfig.decoration}</div>
    {/* العنوان في المنتصف تماماً */}
    <h4 className="font-bold text-base mb-2 px-3 border-b pb-1 text-center" style={{ color: styleConfig.headerColor, borderColor: styleConfig.border + '60' }}>
      {title}
    </h4>
    <textarea
      className="w-full flex-1 min-h-[180px] bg-transparent resize-none focus:outline-none p-3 leading-relaxed text-sm"
      style={{
        backgroundImage: `repeating-linear-gradient(transparent, transparent 28px, ${styleConfig.border}50 29px)`,
        backgroundSize: '100% 29px',
        backgroundAttachment: 'local',
        paddingTop: '5px',
        fontFamily: 'inherit',
        color: customTextColor || '#374151'
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={`اكتب ${title.toLowerCase()} هنا...`}
    />
  </div>
);

function pad(n) { return String(n).padStart(2, "0"); }
function fixedDateKey(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

function getMonthGrid(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function hexToRgba(hex, alpha = 0.15) {
  if (!hex || !hex.startsWith("#")) return "rgba(100, 100, 100, 0.15)";
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map(char => char + char).join("");
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

export default function CalendarPlannerPage() {
  const [user, setUser] = useState(null);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [newTask, setTitleTask] = useState("");
  const [newCategory, setNewCategory] = useState("عام");
  const [newCategoryColor, setNewCategoryColor] = useState("#6FA8DC");
  const [notes, setNotes] = useState({ 
    note: "", 
    goals: "", 
    seerah_reflection: "", 
    surahs_to_memorize: "",
    search_question: "",
    self_accounting: ""
  });

  const yearMonthKey = `${cursor.year}-${pad(cursor.month + 1)}`;
  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString("ar", { month: "long", year: "numeric" });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    if (!user) return;
    const start = fixedDateKey(cursor.year, cursor.month, 1);
    const end = fixedDateKey(cursor.year, cursor.month, new Date(cursor.year, cursor.month + 1, 0).getDate());

    supabase
      .from("calendar_tasks")
      .select("*")
      .eq("user_id", user.id)
      .gte("task_date", start)
      .lte("task_date", end)
      .then(({ data }) => setTasks(data || []));

    supabase
      .from("monthly_notes")
      .select("*")
      .eq("user_id", user.id)
      .eq("year_month", yearMonthKey)
      .single()
      .then(({ data }) =>
        setNotes({
          note: data?.note || "",
          goals: data?.goals || "",
          seerah_reflection: data?.seerah_reflection || "",
          surahs_to_memorize: data?.surahs_to_memorize || "",
          search_question: data?.search_question || "",
          self_accounting: data?.self_accounting || `• نعم الله التي شكرت الله عليها:\n• ذنب أحتاج إلى التوبة منه:\n• خلق أريد تحسينه:\n• هل غضضت بصري؟\n• هل بررت والدي؟\n• هل أصلحت بين شخصين أو أدخلت السرور على مسلم؟\n• نافلة أو سنة تريد المحافظة عليها:`,
        })
      );

    setSelectedDay(1);
  }, [user, cursor.year, cursor.month]);

  const changeMonth = (delta) => {
    setCursor((c) => {
      let month = c.month + delta;
      let year = c.year;
      if (month < 0) { month = 11; year -= 1; }
      if (month > 11) { month = 0; year += 1; }
      return { year, month };
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const percent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // --- تجهيز بيانات المخطط البياني اليومي ---
  const daysInCurrentMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
  const dailyProgressData = [];
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dKey = fixedDateKey(cursor.year, cursor.month, d);
    const dayTasks = tasks.filter(t => t.task_date === dKey);
    const dayTotal = dayTasks.length;
    const dayDone = dayTasks.filter(t => t.done).length;
    const dayPercent = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;
    if (dayTotal > 0) {
      dailyProgressData.push({ day: `${d}`, progress: dayPercent });
    }
  }

  // --- تجميع بيانات التصنيفات للـ Pie Chart ---
  const categoryStats = tasks.reduce((acc, task) => {
    const cat = task.category || "عام";
    if (!acc[cat]) {
      acc[cat] = { 
        name: cat, 
        value: 0, 
        color: task.category_color || DEFAULT_COLORS[Math.abs(cat.charCodeAt(0)) % DEFAULT_COLORS.length] 
      };
    }
    acc[cat].value += 1;
    if (task.category_color) acc[cat].color = task.category_color;
    return acc;
  }, {});

  const chartData = Object.values(categoryStats);

  const getCategoryColor = (catName) => {
    const found = chartData.find(c => c.name === catName);
    return found ? found.color : newCategoryColor;
  };

  const tasksForDay = (day) => tasks.filter((t) => t.task_date === fixedDateKey(cursor.year, cursor.month, day));

  const addTask = async () => {
    if (!user) return alert("سجل الدخول أولًا");
    if (!newTask.trim()) return;
    const categoryName = newCategory.trim() || "عام";
    
    const { data } = await supabase
      .from("calendar_tasks")
      .insert({ 
        user_id: user.id, 
        task_date: fixedDateKey(cursor.year, cursor.month, selectedDay), 
        title: newTask, 
        category: categoryName,
        category_color: newCategoryColor 
      })
      .select()
      .single();
      
    if (data) setTasks((prev) => [...prev, data]);
    setTitleTask("");
  };

  const toggleTask = async (task) => {
    const { data } = await supabase.from("calendar_tasks").update({ done: !task.done }).eq("id", task.id).select().single();
    if (data) setTasks((prev) => prev.map((t) => (t.id === task.id ? data : t)));
  };

  const deleteTask = async (taskId) => {
    await supabase.from("calendar_tasks").delete().eq("id", taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const saveNotes = async () => {
    if (!user) return;
    await supabase
      .from("monthly_notes")
      .upsert({ user_id: user.id, year_month: yearMonthKey, ...notes, updated_at: new Date().toISOString() }, { onConflict: "user_id,year_month" });
  };

  const grid = getMonthGrid(cursor.year, cursor.month);
  const selectedTasks = tasksForDay(selectedDay);

  return (
    <div className="space-y-6">
      {/* بطاقات الإحصائيات (3 بطاقات) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <div className="bg-green-50 text-green-800 rounded-xl py-2 text-center font-bold mb-3">{monthLabel}</div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>المكتملة: {completedTasks}</span>
            <span>المتبقية: {totalTasks - completedTasks}</span>
          </div>
          <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${percent}%`, backgroundColor: "#166534" }} /></div>
        </div>

        <div className="card">
          <div className="bg-blue-50 text-blue-800 rounded-xl py-2 text-center font-bold mb-3">تقدم الشهر</div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{totalTasks} مهمة</span>
            <span>{percent}%</span>
          </div>
          <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${percent}%`, backgroundColor: "#6fa8dc" }} /></div>
        </div>

        <div className="card flex flex-col items-center justify-center">
          <div className="bg-rose-50 text-rose-800 rounded-xl py-2 px-4 text-center font-bold mb-2 w-full">إجمالي الإنجاز</div>
          <p className="text-3xl font-bold" >{percent}%</p>
        </div>
      </div>

      {/* قسم التقويم مع المهام اليومية */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* مهام اليوم المحدد */}
        <div className="card flex-1 order-2 lg:order-1">
          <h3 className="font-bold mb-3 text-center lg:text-right">
            مهام يوم {selectedDay} {monthLabel}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
            <input
              className="border rounded-lg p-2 flex-1 w-full"
              placeholder="أضف مهمة جديدة..."
              value={newTask}
              onChange={(e) => setTitleTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <input
              className="border rounded-lg p-2 sm:w-28 text-sm"
              placeholder="التصنيف"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex items-center gap-1 bg-gray-50 border rounded-lg px-2 py-1">
              <span className="text-[11px] text-gray-500">اللون:</span>
              <input
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="w-7 h-7 cursor-pointer border-0 bg-transparent rounded"
                title="اختر لون  التصنيف"
              />
            </div>
            <button onClick={addTask} className="btn-primary w-full sm:w-auto">إضافة</button>
          </div>
          
          <div className="space-y-2">
            {selectedTasks.map((t) => { t.category_color
              const catColor = t.category_color || "#6fa8dc";
              // getCategoryColor(t.category);
              return (
                <div 
                  key={t.id} 
                  className="flex items-center gap-2 rounded-lg p-2.5 transition-all border border-black/5 shadow-2xs"
                  style={{ backgroundColor: hexToRgba(catColor, 0.18) }}
                >
                  <input type="checkbox" checked={t.done} onChange={() => toggleTask(t)} className="cursor-pointer" />
                  
                  {t.category && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: catColor  }}
                    >
                      {t.category}
                    </span>
                  )}

                  <span className={`flex-1 font-medium ${t.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {t.title}
                  </span>

                  <button onClick={() => deleteTask(t.id)} className="text-red-400 hover:text-red-600 text-sm px-1">✕</button>
                </div>
              );
            })}
            {selectedTasks.length === 0 && <p className="text-gray-400 text-sm text-center">لا توجد مهام لهذا اليوم بعد</p>}
          </div>
        </div>

        {/* التقويم */}
        <div className="card w-full lg:w-72 shrink-0 order-1 lg:order-2 bg-[url('../public/images/badges/p9.jpg')] bg-opacity-50  ">
          <div className="flex items-center justify-between mb-3" >
            <button onClick={() => changeMonth(-1)} className="text-primary text-lg px-1">→</button>
            <h2 className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{monthLabel}</h2>
            <button onClick={() => changeMonth(1)} className="text-primary text-lg px-1">←</button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-bold text-gray-500 mb-1">
            {WEEKDAYS.map((d) => (
              <div key={d}>{d[0]}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {grid.map((day, i) => {
              if (!day) return <div key={i} />;
              const dayTasks = tasksForDay(day);
              const dayDone = dayTasks.length > 0 && dayTasks.every((t) => t.done);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-md border text-xs flex flex-col items-center justify-center gap-0.5 transition-colors ${
                    dayDone
                      ? "text-white border-transparent"
                      : selectedDay === day
                      ? "border-primary bg-primary/10"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                  style={dayDone ? { backgroundColor: "var(--color-primary)" } : undefined}
                >
                  <span className="font-semibold">{day}</span>
                  {dayTasks.length > 0 && !dayDone && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* القسم الوسطي: الملاحظات الأربعة الأساسية ودائرة التصنيفات */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <CuteNoteCard
            title="ملاحظة الشهر"
            value={notes.note}
            onChange={(e) => setNotes({ ...notes, note: e.target.value })}
            onBlur={saveNotes}
            styleConfig={NoteStyle1}
            icon={NoteStyle1.decoration}
          />

          <CuteNoteCard
            title="الأهداف الكبرى"
            value={notes.goals}
            onChange={(e) => setNotes({ ...notes, goals: e.target.value })}
            onBlur={saveNotes}
            styleConfig={NoteStyle2}
            icon={NoteStyle2.decoration}
          />

          <CuteNoteCard
            title="قصة صحابي أو نبي"
            value={notes.seerah_reflection}
            onChange={(e) => setNotes({ ...notes, seerah_reflection: e.target.value })}
            onBlur={saveNotes}
            styleConfig={NoteStyle3}
            icon={NoteStyle3.decoration}
          />

          <CuteNoteCard
            title="سور من لقرآن"
            value={notes.surahs_to_memorize}
            onChange={(e) => setNotes({ ...notes, surahs_to_memorize: e.target.value })}
            onBlur={saveNotes}
            styleConfig={NoteStyle4}
            icon={NoteStyle4.decoration}
          />
        </div>

        {/* مخطط التصنيفات الدائري */}
        <div className="card w-full lg:w-80 shrink-0 flex flex-col items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-bold mb-1 text-center" style={{ color: "var(--color-primary)" }}>توزيع التصنيفات </p>
          
          {chartData.length > 0 ? (
            <>
              <div className="w-full h-48 my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip formatter={(value, name, props) => [`${value} مهمة`, props.payload.name]} />
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full flex flex-wrap justify-center gap-2 my-2">
                {chartData.map((item, idx) => {
                  const percentage = totalTasks > 0 ? Math.round((item.value / totalTasks) * 100) : 0;
                  return (
                    <div key={idx} className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md shadow-xs border border-gray-100 text-[11px]">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-bold text-gray-700">{item.name}:</span>
                      <span className="text-gray-500">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400 text-center py-12">أضف مهام وتصنيفات لعرض المخطط</p>
          )}

          <p className="text-[11px] text-gray-600 leading-relaxed text-center mt-2 border-t border-gray-100 pt-2 w-full">
            «من سلك طريقًا يلتمس فيه علمًا، سهّل الله له به طريقًا إلى الجنة» — مسلم
          </p>
        </div>
      </div>

      {/* القسم السفلي: نوتة السؤال بجانب المخطط (بدل الفوائد) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* المخطط البياني اليومي (Line Chart) */}
        <div className="card w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <p className="font-bold mb-3 text-center" style={{  color: "var(--color-primary)" }}><CutePlannerChartIco/><span> مخطط تطور الإنجاز اليومي </span></p>
          <div className="w-full h-[230px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "نسبة الإنجاز"]} />
                <Line type="monotone" dataKey="progress" stroke={ "var(--color-primary)" } strokeWidth={3} dot={{ fill: "var(--color-primary)", r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* نوتة "سؤال أريد البحث عن إجابته" بجانب المخطط */}
        <div>
          <CuteNoteCard
            title="سؤال أريد البحث عن إجابته"
            value={notes.search_question}
            onChange={(e) => setNotes({ ...notes, search_question: e.target.value })}
            onBlur={saveNotes}
            styleConfig={NoteStyle6}
            icon={NoteStyle6.decoration}
          />
        </div>
      </div>

      {/* النوتة الكبرى في الأسفل منفردة: محاسبة النفس يومياً */}
      <div className="grid grid-cols-1 gap-4">
        <CuteNoteCard
          title="محاسبة النفس يومياً"
          value={notes.self_accounting}
          onChange={(e) => setNotes({ ...notes, self_accounting: e.target.value })}
          onBlur={saveNotes}
          styleConfig={NoteStyleSelfAccount}
          icon={NoteStyleSelfAccount.decoration}
          customTextColor="#1b5e20"
        />
      </div>
    </div>
  );
  }