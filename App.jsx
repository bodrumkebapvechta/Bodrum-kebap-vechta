import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Flame, ArrowLeft, ArrowRight, Check, MessageCircle, ChevronLeft, Plus, Minus,
  ShoppingBag, Users, Gift, RotateCw, Lock, ShieldCheck, Phone, RefreshCw,
  Sparkles, User, Copy, Menu as MenuIcon, X, MapPin, Clock3, Instagram, Star, Timer,
} from 'lucide-react';

/* ============ DESIGN TOKENS ============ */
const GREEN = '#153826';
const ORANGE = '#ff6a1a';
const GOLD = '#ffc738';
const CREAM = '#fff6ea';
const CHILI = '#d62828';
const WHATSAPP_NUMBER = '4915210804759';

/* ============ ASSETS ============ */
const LOGO_ICON = "/logo.png";
const FOOD_HERO = "/hero.jpg";
const FOOD_G1 = "/food-g1.jpg";
const FOOD_G2 = "/food-g2.jpg";
const FOOD_G3 = "/food-g3.jpg";
const FOOD_G4 = "/food-g4.jpg";
const FOOD_G5 = "/food-g5.jpg";
const TERRACE_IMG = "/terrace.jpg";
const DOENER_TELLER_IMG = "/doener-teller.jpg";

/* ============ MENU DATA ============ */
const MENU = [
  { key: 'kebap', label: 'Kebap', items: [
    { id: 'k1', name: 'Kalb Kebap', price: 8.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln' },
    { id: 'k2', name: 'Kebap Spezial Weichkäse', price: 8.5, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln, Weichkäse in Salzlake' },
    { id: 'k3', name: 'Kebap Hollandaise Soße', price: 8.5, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Salat, Zwiebeln' },
    { id: 'k4', name: 'Bodrum Gemüse Kebap', price: 9.0, desc: 'Fritiertes Gemüse, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln' },
    { id: 'k5', name: 'Jumbo Kebap', price: 9.0, desc: 'Extra Portion Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln' },
    { id: 'k6', name: 'Kebap Box', price: 8.0, desc: 'Fleisch vom Drehspieß, Pommes und Knoblauchsoße' },
    { id: 'k7', name: 'Vegetarische Tasche', price: 7.0, desc: 'Brot mit Salat, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'k8', name: 'Dürüm Kebap', price: 9.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße und Zwiebeln' },
    { id: 'k9', name: 'Bodrum Gemüse Dürüm Kebap', price: 10.0, desc: 'Lavasbrot, Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und fritiertes Gemüse' },
    { id: 'k10', name: 'Türkische Pizza Salat (Lahmacun)', price: 8.0, desc: 'Mit Salat, Knoblauchsoße und Zwiebeln' },
    { id: 'k11', name: 'Türkische Pizza Kebap (Lahmacun)', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Salat und Zwiebeln' },
    { id: 'k12', name: 'Steak Teller', price: 14.0, desc: 'Steak Fleisch, Salat, Knoblauchsoße, Zwiebeln und Pommes', weekend: true },
    { id: 'k13', name: 'Kebap Teller', price: 12.0, desc: 'Fleisch vom Drehspieß, Salat, Knoblauchsoße, Zwiebeln und Pommes' },
    { id: 'k14', name: 'Kebap Teller Bodrum', price: 13.0, desc: 'Salat, Knoblauchsoße, Zwiebeln, Weichkäse, Peperoni und Pommes' },
    { id: 'k15', name: 'Kebap Teller Hollandaise Soße', price: 13.0, desc: 'Salat, Zwiebeln, Hollandaise und Pommes' },
    { id: 'k16', name: 'Gemüse Kebap Teller', price: 13.5, desc: 'Fritiertes Gemüse, Salat, Knoblauchsoße, Zwiebeln, Pommes' },
    { id: 'k17', name: 'Falafel Tasche', price: 7.0, desc: 'Mit Salat und Knoblauchsoße' },
    { id: 'k18', name: 'Falafel Tortilla Dürüm', price: 8.0, desc: 'Mit Salat und Knoblauchsoße' },
    { id: 'k19', name: 'Falafel Teller (7 Stück)', price: 10.0, desc: 'Mit Salat und Pommes' },
  ]},
  { key: 'pizza', label: 'Pizza', items: [
    { id: 'p24', name: 'Pizza Margherita', priceSmall: 7.0, priceLarge: 8.0 },
    { id: 'p25', name: 'Pizza Salami', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p26', name: 'Pizza Schinken', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p27', name: 'Pizza Kebap', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p28', name: 'Pizza Kebap Hollandaise', priceSmall: 9.0, priceLarge: 10.0 },
    { id: 'p29', name: 'Pizza Bodrum', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln, Jalapeños und Hollandaise Soße' },
    { id: 'p30', name: 'Pizza Rastaa', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Mais und Peperoni, Hollandaise Soße' },
    { id: 'p31', name: 'Pizza Oldenburger Münsterland', priceSmall: 10.0, priceLarge: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais und Hollandaise Soße' },
    { id: 'p32', name: 'Pizza Thunfisch', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mit Zwiebeln' },
    { id: 'p33', name: 'Pizza Steak', priceSmall: 9.0, priceLarge: 10.0, weekend: true },
    { id: 'p34', name: 'Pizza Hawaii', priceSmall: 9.0, priceLarge: 10.0, desc: 'Putenschinken und Ananas' },
    { id: 'p35', name: 'Pizza Türkei', priceSmall: 10.0, priceLarge: 11.0, desc: 'Rindersalami, Putenschinken, Pilzen und Ei' },
    { id: 'p36', name: 'Pizza Sucuk', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit türkischer Knoblauchwurst' },
    { id: 'p37', name: 'Pizza Spezial', priceSmall: 8.5, priceLarge: 9.5, desc: 'Thunfisch, Putenschinken, Ananas und Pilzen' },
    { id: 'p38', name: 'Pizza Vechta', priceSmall: 10.5, priceLarge: 11.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Zwiebeln, Paprika, Hollandaise Soße, Weichkäse in Salzlake' },
    { id: 'p39', name: 'Pizza Deutschland', priceSmall: 9.5, priceLarge: 10.5, desc: 'Fleisch vom Drehspieß und Paprika' },
    { id: 'p40', name: 'Pizza Spinat', priceSmall: 8.5, priceLarge: 9.5, desc: 'Knoblauch und Weichkäse in Salzlake' },
    { id: 'p41', name: 'Pizza Vegetarisch', priceSmall: 8.0, priceLarge: 9.0, desc: 'Pilzen, Brokkoli, Paprika und Mais' },
    { id: 'p42', name: 'Pizza Mozzarella', priceSmall: 8.5, priceLarge: 9.5, desc: 'Frische Tomaten und Mozzarella' },
    { id: 'p43', name: 'Pizza Taverna', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Ei' },
    { id: 'p44', name: 'Pizza Krabben', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch' },
    { id: 'p45', name: 'Pizza Meeresfrüchte', priceSmall: 8.5, priceLarge: 9.5, desc: 'Mit Knoblauch' },
    { id: 'p46', name: 'Pizza QuattroStagioni', priceSmall: 9.5, priceLarge: 10.5, desc: 'Rindersalami, Putenschinken, Pilzen und Paprika' },
    { id: 'p47', name: 'Pizza Vier Käse', priceSmall: 9.0, priceLarge: 10.0, desc: 'Mozzarella, Gorgonzola und Weichkäse' },
    { id: 'p48', name: 'Pizza Bolognese', priceSmall: 8.0, priceLarge: 9.0, desc: 'Mit Fleischsoße' },
    { id: 'p49', name: 'Pizza Brokoli', priceSmall: 8.0, priceLarge: 9.0 },
    { id: 'p52', name: 'Pizza Oythe', priceSmall: 9.5, priceLarge: 10.5, desc: 'Krabben, Putenschinken, Knoblauch' },
    { id: 'p53', name: 'Pizza Italia', priceSmall: 9.5, priceLarge: 10.5, desc: 'Brokkoli, Pilzen, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'p54', name: 'Pizza Fantaria', priceSmall: 10.0, priceLarge: 11.5, desc: 'Rindersalami, Putenschinken, Paprika und Peperoni' },
    { id: 'p56', name: 'Pizzabrot', price: 4.5 },
    { id: 'p57', name: 'Pizzabrot mit Käse', price: 5.5 },
    { id: 'p58', name: 'Pizzabrot mit Knoblauch', price: 5.5 },
    { id: 'p59', name: 'Pizzabrot mit Kräuterbutter', price: 5.5 },
    { id: 'p60', name: 'Pizzabrötchen mit Käse', price: 7.0, desc: 'Gratis Dip inklusive' },
    { id: 'p61', name: 'Pizzabrötchen mit Fleisch', price: 8.0, desc: 'Gratis Dip inklusive' },
    { id: 'p62', name: 'Pizzabrötchen mit Salami', price: 8.0, desc: 'Gratis Dip inklusive' },
    { id: 'p63', name: 'Pizzabrötchen mit Thunfisch', price: 8.0, desc: 'Gratis Dip inklusive' },
  ]},
  { key: 'calzone', label: 'Calzone', items: [
    { id: 'c78', name: 'Calzone Steak', price: 12.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse', weekend: true },
    { id: 'c79', name: 'Calzone Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Knoblauchsoße, Zwiebeln und Weichkäse in Salzlake' },
    { id: 'c80', name: 'Calzone Bodrum Hollandaise', price: 11.0, desc: 'Fleisch vom Drehspieß, Hollandaise Soße, Zwiebeln, Jalapeños und Weichkäse in Salzlake' },
    { id: 'c81', name: 'Calzone Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln' },
    { id: 'c82', name: 'Calzone Vegetarisch', price: 9.5, desc: 'Paprika, Pilzen, Brokoli, Mais und Weichkäse' },
    { id: 'c83', name: 'Calzone Gourmet', price: 10.0, desc: 'Rindersalami, Schinken und Pilzen' },
    { id: 'c84', name: 'Calzone Hawaii', price: 9.5, desc: 'Putenschinken und Ananas' },
  ]},
  { key: 'baguette', label: 'Baguette', items: [
    { id: 'b114', name: 'Baguette Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Pilzen, Zwiebeln, Käse, Salat, Tomaten, Gurken' },
    { id: 'b115', name: 'Baguette Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Käse, Hollandaise Soße, Weichkäse in Salzlake, Salat, Tomaten und Gurken' },
    { id: 'b116', name: 'Baguette Salami', price: 9.0, desc: 'Salat, Tomaten, Gurken, Rindersalami und Käse' },
    { id: 'b117', name: 'Baguette Schinken', price: 9.0, desc: 'Salat, Tomaten, Gurken und Käse' },
    { id: 'b118', name: 'Baguette Hawaii', price: 9.0, desc: 'Putenschinken, Ananas, Salat, Tomaten, Gurken' },
    { id: 'b119', name: 'Baguette Thunfisch', price: 9.0, desc: 'Thunfisch, Zwiebeln, Käse, Salat, Tomaten und Gurken' },
    { id: 'b120', name: 'Baguette Vegetarisch', price: 9.0, desc: 'Pilzen, Paprika, Mais, Käse, Salat, Tomaten und Gurken' },
  ]},
  { key: 'ueberbacken', label: 'Kebap überbacken', items: [
    { id: 'u130', name: 'Hähnchen überbacken', price: 11.0, desc: 'Gebratenes Hähnchen, Sahnesoße, Paprika und Pilzen' },
    { id: 'u131', name: 'Kebap überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Zwiebeln und Tomatensoße' },
    { id: 'u132', name: 'Kebap überbacken Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Pilzen und Sahnesoße' },
    { id: 'u133', name: 'Kebap Hawaii überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße und Ananas' },
    { id: 'u134', name: 'Kebap Spezial überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomatensoße, Brokoli, Pilzen und Weichkäse' },
    { id: 'u135', name: 'Kebap Hollandaise überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Tomaten, Paprika und Pilzen' },
    { id: 'u136', name: 'Kebap Vechta überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Mais, Brokoli und Sahnesoße' },
  ]},
  { key: 'rollo', label: 'Rollo überbacken', items: [
    { id: 'r146', name: 'Rollo Steak', price: 12.0, desc: 'Steak Fleisch, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat', weekend: true },
    { id: 'r147', name: 'Rollo Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Knoblauchsoße, mit kleinem Beilagensalat' },
    { id: 'r148', name: 'Rollo Bodrum', price: 11.0, desc: 'Fleisch vom Drehspieß, Zwiebeln und Hollandaise Soße, mit kleinem Beilagensalat' },
    { id: 'r149', name: 'Rollo Thunfisch', price: 10.0, desc: 'Thunfisch und Zwiebeln' },
    { id: 'r150', name: 'Rollo Hawaii', price: 10.0, desc: 'Putenschinken und Ananas' },
    { id: 'r153', name: 'Rollo Spezial', price: 10.0, desc: 'Rindersalami, Putenschinken und Pilzen' },
  ]},
  { key: 'nudeln', label: 'Nudeln', items: [
    { id: 'n157', name: 'Spaghetti Pomodoro', price: 7.5, desc: 'Mit Tomatensoße' },
    { id: 'n158', name: 'Spaghetti Bolognese', price: 8.0, desc: 'Mit Fleischsoße' },
    { id: 'n159', name: 'Spaghetti Carbonara', price: 8.5, desc: 'Putenschinken, Ei und Sahnesoße' },
    { id: 'n160', name: 'Spaghetti Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli, Pilzen und Sahnesoße' },
    { id: 'n161', name: 'Makkaroni Vegetaria', price: 8.5, desc: 'Brokkoli, Pilzen, Paprika, Tomatensoße' },
    { id: 'n162', name: 'Makkaroni Kebap', price: 9.0, desc: 'Fleisch vom Drehspieß, Tomatensoße, überbacken mit Käse' },
    { id: 'n163', name: 'Makkaroni Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli, Pilzen und Sahnesoße' },
    { id: 'n164', name: 'Makkaroni Al Forno', price: 9.5, desc: 'Fleisch vom Drehspieß, Brokkoli, Mais und Sahnesoße, mit Käse überbacken' },
    { id: 'n165', name: 'Alpine Pesto', price: 10.0, desc: 'Hähnchenbrust in Sahnesoße mit Berg-Thymian, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n166', name: 'Curry-Madras', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Curry-Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n167', name: 'Fungi di Roma', price: 10.0, desc: 'Hähnchenbrust mit Pilzen in Sahnesoße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n168', name: 'Balkan Spirit', price: 10.0, desc: 'Hähnchenbrust in Paprika-Auberginen-Soße, serviert mit Kurkuma-Penne & Marktsalat' },
    { id: 'n169', name: 'Soja Salsa', price: 11.0, desc: 'Hähnchenbrust mit Paprika & Pilzen in Sojasoße, serviert mit Kurkuma-Penne & Marktsalat' },
  ]},
  { key: 'schnitzel', label: 'Schnitzel', items: [
    { id: 's184', name: 'Schnitzel Wiener Art', price: 10.0, desc: 'Mit Salat, Pommes' },
    { id: 's185', name: 'Zigeuner Schnitzel', price: 11.0, desc: 'Salat, Zigeunersoße, Pommes' },
    { id: 's186', name: 'Jäger Schnitzel', price: 11.0, desc: 'Salat, Jägersoße, Pommes' },
    { id: 's187', name: 'Brokkoli Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Brokkoli, Pommes' },
    { id: 's188', name: 'Hawaii Schnitzel', price: 11.0, desc: 'Salat, Putenschinken, Ananas, Pommes, überbacken mit Käse' },
    { id: 's189', name: 'Gorgonzola Schnitzel', price: 11.0, desc: 'Salat, Sahnesoße, Gorgonzola, Pommes' },
    { id: 's190', name: 'Mozzarella Schnitzel', price: 11.0, desc: 'Frische Tomaten, Mozzarella, Sahnesoße, Pommes, überbacken mit Käse und Salat' },
    { id: 's191', name: 'Rahm Schnitzel', price: 11.0, desc: 'Salat, Pilzen, Rahmpulver, Pommes' },
  ]},
  { key: 'salat', label: 'Salat', items: [
    { id: 'sa95', name: 'Nizza Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Weißkohl, Putenschinken und Käse' },
    { id: 'sa96', name: 'Bauern Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken und Weichkäse' },
    { id: 'sa97', name: 'Thunfisch Salat', price: 8.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Thunfisch und Zwiebeln' },
    { id: 'sa98', name: 'Mais Salat', price: 7.0, desc: 'Grüner Salat, Tomaten, Gurken, Weißkohl, Zwiebeln und Mais' },
    { id: 'sa100', name: 'Mozzarella Salat', price: 8.0, desc: 'Grüner Salat, Tomaten und Mozzarella' },
    { id: 'sa101', name: 'Bodrum Salat', price: 9.5, desc: 'Grüner Salat, Tomaten, Gurken, Zwiebeln, Mais, Weißkohl, Thunfisch, Putenschinken, Paprika und Weichkäse in Salzlake' },
    { id: 'sa102', name: 'Kebap Salat', price: 9.0, desc: 'Fleisch vom Drehspieß, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl' },
    { id: 'sa104', name: 'Hähnchen Salat', price: 9.0, desc: 'Gebratenes Hähnchen, grüner Salat, Tomaten, Gurken, Zwiebeln und Weißkohl' },
  ]},
  { key: 'finger', label: 'Finger Food', items: [
    { id: 'f201', name: 'Chicken Strips (5 Stück)', price: 5.0, desc: '5 Stück' },
    { id: 'f202', name: 'Nuggets (7 Stück)', price: 5.0, desc: '7 Stück' },
    { id: 'f203', name: 'Pommes Frites', price: 3.5 },
    { id: 'f204', name: 'Portion Knoblauch/Spezialsoße', price: 2.5 },
    { id: 'f205', name: 'Portion Oliven (Schwarz)', price: 2.0 },
    { id: 'f206', name: 'Portion Peperoni', price: 2.5 },
    { id: 'f207', name: 'Portion Beilagensalat / Weißkohl', price: 3.5 },
    { id: 'f208', name: 'Portion Fleisch', price: 8.0 },
  ]},
  { key: 'getraenke', label: 'Getränke', items: [
    { id: 'g301', name: 'Coca-Cola (Dose)', price: 2.5 },
    { id: 'g302', name: 'Coca-Cola Zero (Dose)', price: 2.5 },
    { id: 'g303', name: 'Fanta (Dose)', price: 2.5 },
    { id: 'g304', name: 'Uludağ Gazoz (Dose)', price: 2.5 },
    { id: 'g305', name: 'Ayran', price: 2.0 },
    { id: 'g306', name: 'Wasser (still/spritzig)', price: 2.0 },
    { id: 'g307', name: 'Eistee Pfirsich (Dose)', price: 2.5 },
    { id: 'g308', name: 'Fritz-Kola', price: 3.0 },
    { id: 'g309', name: 'Fritz-Limo', price: 3.0, desc: 'Zitrone oder Apfel-Kirsch-Holunder' },
    { id: 'g310', name: 'Fritz-Spritz', price: 3.0, desc: 'Bio-Rhabarber oder Bio-Traubenschorle' },
    { id: 'g311', name: 'Vita Malz', price: 3.0 },
    { id: 'g312', name: 'Energy Drink', price: 3.0 },
  ]},
];
const EXTRA_TOPPINGS = ['Mais', 'Zwiebeln', 'Ananas', 'Peperoni', 'Paprika', 'Brokkoli', 'Pilze', 'Sucuk'];

/* ============ HELPERS ============ */
function fmt(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
function menuNum(id) { if (/^g\d/.test(id)) return ''; return id.replace(/^[a-z]+/i, ''); }
function normalizePhone(raw) { return raw.replace(/[^\d+]/g, ''); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
async function safeGet(key) {
  try { const res = await window.storage.get(key, true); return res ? JSON.parse(res.value) : null; }
  catch { return null; }
}
async function safeSet(key, value) {
  try { await window.storage.set(key, JSON.stringify(value), true); return true; }
  catch { return false; }
}

/* ============ WHEEL DATA ============ */
const WHEEL_PRIZES = [
  { label: '10% Rabatt', weight: 13, color: GREEN, text: '#fff' },
  { label: 'Nochmal Glück!', weight: 20, color: '#e8d9b8', text: GREEN },
  { label: 'Gratis Getränk', weight: 15, color: ORANGE, text: '#fff' },
  { label: 'Gratis Pommes', weight: 15, color: GREEN, text: '#fff' },
  { label: 'Nochmal Glück!', weight: 20, color: '#e8d9b8', text: GREEN },
  { label: 'Gratis Nuggets', weight: 12, color: ORANGE, text: '#fff' },
  { label: '10% Rabatt', weight: 5, color: GREEN, text: '#fff' },
];
const WHEEL_N = WHEEL_PRIZES.length;
const WHEEL_SLICE = 360 / WHEEL_N;
function pickWheelPrize() {
  const total = WHEEL_PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < WHEEL_PRIZES.length; i++) { r -= WHEEL_PRIZES[i].weight; if (r <= 0) return i; }
  return 0;
}
function makeSpinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function wheelConicGradient() {
  return `conic-gradient(${WHEEL_PRIZES.map((p, i) => `${p.color} ${i * WHEEL_SLICE}deg ${(i + 1) * WHEEL_SLICE}deg`).join(',')})`;
}

/* ============ SHARED UI ============ */
function TopBar({ onHome, title, dark = true }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-6 pb-4">
      <button onClick={onHome} className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: dark ? 'rgba(255,246,234,0.12)' : '#f0e5cf' }}>
        <ArrowLeft size={18} color={dark ? CREAM : GREEN} />
      </button>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ORANGE }}>
          <Flame size={18} color="#fff" />
        </div>
        <div>
          <div className="font-extrabold text-sm leading-tight tracking-wide" style={{ color: dark ? '#fff' : GREEN }}>BODRUM KEBAP</div>
          <div className="text-[10px] font-semibold tracking-[0.2em]" style={{ color: GOLD }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
function Stepper({ qty, onAdd, onRemove }) {
  return (
    <div className="flex items-center gap-2.5 flex-shrink-0">
      {qty > 0 && (
        <>
          <button onClick={onRemove} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#f0e5cf', color: GREEN }}><Minus size={14} /></button>
          <span className="text-sm font-bold w-4 text-center" style={{ color: GREEN }}>{qty}</span>
        </>
      )}
      <button onClick={onAdd} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: ORANGE, color: '#fff' }}><Plus size={14} /></button>
    </div>
  );
}
function QtyRow({ label, qty, onAdd, onRemove }) {
  return (
    <div className="flex-1 flex items-center justify-between px-2.5 py-2 rounded-lg" style={{ background: '#f7f0e2' }}>
      <span className="text-[11px] font-semibold" style={{ color: '#7c6d55' }}>{label}</span>
      <Stepper qty={qty} onAdd={onAdd} onRemove={onRemove} />
    </div>
  );
}

const CATEGORY_ICONS = {
  kebap: '🥙', pizza: '🍕', calzone: '🥟', baguette: '🥖', ueberbacken: '🧀',
  rollo: '🌯', nudeln: '🍝', schnitzel: '🍗', salat: '🥗', finger: '🍟', getraenke: '🥤',
};

const UPSELL_ITEMS = [
  { id: 'f203', name: 'Pommes Frites', price: 3.5, emoji: '🍟' },
  { id: 'f202', name: 'Nuggets (7 Stück)', price: 5.0, emoji: '🍗' },
  { id: 'f201', name: 'Chicken Strips (5 Stück)', price: 5.0, emoji: '🍤' },
  { id: 'f204', name: 'Portion Soße', price: 2.5, emoji: '🥫' },
  ...(MENU.find((m) => m.key === 'getraenke')?.items || []).map((d) => ({ id: d.id, name: d.name, price: d.price, emoji: '🥤' })),
];

function UpsellStrip({ addItem }) {
  return (
    <div className="mx-5 mt-1 mb-3 rounded-xl overflow-hidden" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <div className="px-3.5 pt-2.5 text-[11px] font-black tracking-wide" style={{ color: '#8a5a1f' }}>🔥 DAZU PASST PERFEKT — nicht vergessen!</div>
      <div className="flex gap-2 overflow-x-auto px-3.5 pb-3 pt-1.5">
        {UPSELL_ITEMS.map((u) => (
          <button
            key={u.id}
            onClick={() => addItem(u.id, u.name, u.price)}
            className="flex-none flex items-center gap-2 pl-2 pr-3 py-2 rounded-full"
            style={{ background: '#fff', border: '1px solid #f0d4a8' }}
          >
            <span className="text-lg">{u.emoji}</span>
            <span className="text-xs font-bold" style={{ color: GREEN }}>{u.name}</span>
            <span className="text-xs font-black" style={{ color: ORANGE }}>+{fmt(u.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function WheelPromoBanner({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl p-4 flex items-center gap-3.5 text-left relative overflow-hidden"
      style={{ background: `linear-gradient(120deg, ${CHILI}, ${ORANGE})`, animation: 'wheelBannerGlow 2s ease-out infinite' }}
    >
      <style>{`
        @keyframes wheelBannerGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.5);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
        @keyframes wheelSpin360 { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
      `}</style>
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(255,255,255,.22)', animation: 'wheelSpin360 4s linear infinite' }}>🎡</div>
      <div className="flex-1">
        <div className="text-white font-black text-sm leading-tight">Dreh am Glücksrad, bevor du bestellst!</div>
        <div className="text-[11.5px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,.9)' }}>Gewinne z. B. 10% Rabatt, ein Gratis-Getränk, Gratis-Pommes oder Chicken Nuggets 🎁</div>
      </div>
      <ArrowRight size={18} color="#fff" />
    </button>
  );
}
function WheelWidget({ onWin, compact }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const size = compact ? 240 : 280;

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);
    const idx = pickWheelPrize();
    const center = idx * WHEEL_SLICE + WHEEL_SLICE / 2;
    setRotation(5 * 360 + (360 - center));
    setTimeout(async () => {
      const prize = WHEEL_PRIZES[idx];
      const isReal = prize.label !== 'Nochmal Glück!';
      let res;
      if (isReal) {
        const code = makeSpinCode();
        await safeSet(`spincode:${code}`, { prize: prize.label, redeemed: false, at: new Date().toISOString() });
        res = { prize: prize.label, code };
      } else {
        res = { prize: prize.label, code: null };
      }
      setResult(res);
      setSpinning(false);
      onWin && onWin(res);
    }, 4200);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: -12, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `18px solid ${GOLD}`, zIndex: 10 }} />
        <div className="rounded-full relative" style={{
          width: size, height: size, background: wheelConicGradient(), border: `6px solid ${GOLD}`,
          transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4.2s cubic-bezier(0.17,0.67,0.16,0.99)' : 'none',
        }}>
          {WHEEL_PRIZES.map((p, i) => {
            const angle = i * WHEEL_SLICE + WHEEL_SLICE / 2;
            return (
              <div key={i} className="absolute left-1/2 top-1/2 origin-left text-center" style={{ width: size * 0.4, transform: `rotate(${angle - 90}deg) translateX(14px)` }}>
                <span className="block font-black leading-[1.15]" style={{ color: p.text, fontSize: 13, transform: 'translateY(-6px)' }}>{p.label}</span>
              </div>
            );
          })}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center" style={{ width: 50, height: 50, background: '#fff', border: `4px solid ${GOLD}` }}>
          <Flame size={20} color={ORANGE} />
        </div>
      </div>
      {!result && (
        <button onClick={spin} disabled={spinning} className="mt-7 w-full py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: ORANGE, color: '#fff' }}>
          <RotateCw size={17} /> {spinning ? 'Dreht sich…' : 'Jetzt drehen!'}
        </button>
      )}
      {result && (
        <div className="mt-7 w-full bg-white rounded-2xl p-5 text-center shadow-sm" style={{ borderTop: `4px solid ${ORANGE}` }}>
          {result.code ? (
            <>
              <div className="text-2xl mb-1">🎉</div>
              <div className="font-black text-base mb-1" style={{ color: GREEN }}>{result.prize}</div>
              <div className="text-xs font-medium mb-3" style={{ color: '#7c6d55' }}>Zeig diesen Code an der Kasse:</div>
              <div className="text-xl font-black tracking-[0.25em] py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: GREEN }}>{result.code}</div>
            </>
          ) : (
            <>
              <div className="text-2xl mb-1">🍀</div>
              <div className="font-black text-base" style={{ color: GREEN }}>Diesmal kein Extra-Gewinn</div>
              <div className="text-xs font-medium mt-1" style={{ color: '#7c6d55' }}>Aber danke fürs Mitspielen — beim nächsten Mal mehr Glück!</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ SPLASH ============ */
function SplashScreen({ onDone }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 120);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1300);
    const t4 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center" style={{ background: GREEN }} onClick={onDone}>
      <style>{`
        @keyframes popIn { 0%{ transform:scale(.4) rotate(-15deg); opacity:0; } 60%{ transform:scale(1.08) rotate(4deg); opacity:1; } 100%{ transform:scale(1) rotate(0deg); opacity:1; } }
        @keyframes riseFade { 0%{ transform:translateY(16px); opacity:0; } 100%{ transform:translateY(0); opacity:1; } }
        @keyframes glowPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 0 22px rgba(255,199,56,0);} }
        @keyframes spinSlow { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes shimmerBar { 0%{ background-position:-200px 0;} 100%{ background-position:200px 0;} }
      `}</style>
      <div className="flex flex-col items-center px-8 text-center">
        <div
          className="rounded-full flex items-center justify-center mb-6 relative"
          style={{
            width: 108, height: 108, background: CREAM,
            animation: stage >= 1 ? 'popIn .7s cubic-bezier(.34,1.56,.64,1) forwards, glowPulse 2.4s ease-out 0.7s infinite' : 'none',
            opacity: stage >= 1 ? 1 : 0,
          }}
        >
          <img src={LOGO_ICON} alt="logo" style={{ width: 78, height: 78, objectFit: 'contain' }} />
        </div>
        <div style={{ opacity: stage >= 2 ? 1 : 0, animation: stage >= 2 ? 'riseFade .6s ease forwards' : 'none' }}>
          <div className="text-white font-black text-2xl tracking-wide">BODRUM KEBAP</div>
          <div className="font-bold text-sm tracking-[4px] mt-1" style={{ color: GOLD }}>VECHTA</div>
        </div>
        <div
          className="mt-6 h-[3px] w-40 rounded-full overflow-hidden"
          style={{
            opacity: stage >= 3 ? 1 : 0, transition: 'opacity .4s ease',
            background: 'linear-gradient(90deg, transparent, rgba(255,199,56,.15), transparent), #2b5c41',
            backgroundSize: '200px 100%, 100% 100%',
            animation: stage >= 3 ? 'shimmerBar 1.1s linear infinite' : 'none',
          }}
        />
        <div className="mt-4 text-xs font-semibold" style={{ color: '#a49475', opacity: stage >= 3 ? 1 : 0, transition: 'opacity .5s ease' }}>
          Frisch vom Drehspieß …
        </div>
      </div>
    </div>
  );
}

/* ============ HOME ============ */
function FeatureCard({ icon, title, sub, color, textColor = '#fff', onClick, index = 0 }) {
  return (
    <button
      onClick={onClick}
      className="feature-card text-left rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: color, boxShadow: '0 10px 30px rgba(21,56,38,.14)',
        animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${index * 0.12}s both`,
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl icon-wobble" style={{ background: 'rgba(255,255,255,0.2)' }}>{icon}</div>
      <div>
        <div className="font-black text-lg leading-tight" style={{ color: textColor }}>{title}</div>
        <div className="text-sm font-medium mt-1" style={{ color: textColor, opacity: 0.85 }}>{sub}</div>
      </div>
      <div className="flex items-center gap-1.5 text-sm font-bold mt-1" style={{ color: textColor }}>Los geht's <ArrowRight size={15} /></div>
    </button>
  );
}

const REVIEWS = [
  { text: 'Günstig und richtig leckeres Essen. Bestellung ging schnell.', name: 'Google-Bewertung' },
  { text: 'Wirklich gutes Essen, schneller Service und tolle Atmosphäre.', name: 'Google-Bewertung' },
  { text: 'Immer wieder gerne – top Qualität und freundliches Team!', name: 'Google-Bewertung' },
  { text: 'Bester Döner in Vechta, immer frisch und lecker zubereitet.', name: 'Google-Bewertung' },
  { text: 'Sehr freundliches Personal und großzügige Portionen.', name: 'Google-Bewertung' },
  { text: 'Die Pizza ist der Hammer, kommt man immer wieder gerne her.', name: 'Google-Bewertung' },
  { text: 'Sauberer Laden, schnelle Zubereitung, klare Empfehlung!', name: 'Google-Bewertung' },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-12">
      <div className="rounded-2xl p-8 sm:p-10 text-center" style={{ background: '#fff', boxShadow: '0 10px 30px rgba(21,56,38,.1)' }}>
        <div className="flex items-center justify-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (<Star key={i} size={19} fill={GOLD} color={GOLD} />))}
        </div>
        <div className="font-black text-sm mb-6" style={{ color: GREEN }}>4,6 · 293 Google-Bewertungen</div>
        <p className="text-lg sm:text-xl font-semibold mb-4" style={{ color: '#4a4032', minHeight: 64 }}>„{REVIEWS[idx].text}"</p>
        <div className="text-xs font-bold tracking-wide" style={{ color: '#a4906c' }}>— {REVIEWS[idx].name}</div>
        <div className="flex justify-center gap-2 mt-6">
          {REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full" style={{ background: i === idx ? ORANGE : '#e3d5bd' }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LunchCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const isWeekday = day >= 1 && day <= 5;
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const active = isWeekday && now >= start && now <= end;

  let mm = 0, ss = 0;
  if (active) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }

  return (
    <div className="py-4 text-center" style={{ background: active ? CHILI : ORANGE, animation: active ? 'urgentPulse 1.4s ease-out infinite' : 'none' }}>
      <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-center gap-3">
        <span className="text-white font-black text-lg">{active ? '🔥 ' : ''}MITTAGSANGEBOT · 9,50 €</span>
        {active ? (
          <span className="text-white text-sm font-black px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,.18)' }}>
            Nur noch {mm}:{ss.toString().padStart(2, '0')} Minuten!
          </span>
        ) : (
          <span className="text-white text-xs font-semibold opacity-90">Mo.–Fr. 11:30–14:00 · Schnitzel, Nudeln, Salat + Getränk</span>
        )}
      </div>
    </div>
  );
}

function useLiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function getOpenStatus(now) {
  const day = now.getDay(); // 0 Sun ... 2 Tue
  if (day === 2) return { open: false, label: 'Geschlossen · Ruhetag', next: 'Öffnet morgen um 11:30 Uhr' };
  const h = now.getHours() + now.getMinutes() / 60;
  if (h >= 11.5 && h < 22) return { open: true, label: 'Jetzt geöffnet', next: `Bis 22:00 Uhr` };
  if (h < 11.5) return { open: false, label: 'Noch geschlossen', next: 'Öffnet heute um 11:30 Uhr' };
  return { open: false, label: 'Geschlossen', next: 'Öffnet morgen um 11:30 Uhr' };
}

function getGreeting(now) {
  const h = now.getHours();
  if (h < 11) return 'Guten Morgen! ☀️';
  if (h < 14) return 'Mahlzeit! 🥙';
  if (h < 18) return 'Schönen Nachmittag! 👋';
  return 'Guten Abend! 🌙';
}

const DAILY_SPECIALS = [
  { day: 0, items: [
    { name: 'Pizza Vier Käse', price: 9.0, desc: 'Mozzarella, Gorgonzola & Weichkäse', img: 'g2' },
    { name: 'Spaghetti Carbonara', price: 8.5, desc: 'Putenschinken, Ei und Sahnesoße', img: 'g3' },
  ]},
  { day: 1, items: [
    { name: 'Kebap überbacken', price: 11.0, desc: 'Fleisch vom Drehspieß, Paprika, Zwiebeln und Tomatensoße, überbacken mit Käse', img: 'g4' },
    { name: 'Baguette Kebap', price: 10.0, desc: 'Fleisch vom Drehspieß, Pilzen, Zwiebeln & Käse', img: 'g5' },
  ]},
  { day: 2, items: null },
  { day: 3, items: [
    { name: 'Spaghetti Bodrum', price: 9.0, desc: 'Fleisch vom Drehspieß, Brokkoli & Sahnesoße', img: 'g3' },
    { name: 'Schnitzel Wiener Art', price: 10.0, desc: 'Mit Salat, Pommes', img: 'g1' },
  ]},
  { day: 4, items: [
    { name: 'Zigeuner Schnitzel', price: 11.0, desc: 'Mit Salat, Pommes', img: 'g1' },
    { name: 'Pizza Spinat', price: 8.5, desc: 'Knoblauch und Weichkäse in Salzlake', img: 'g2' },
  ]},
  { day: 5, items: [
    { name: 'Baguette Bodrum', price: 11.0, desc: 'Hollandaise, Weichkäse & frisches Gemüse', img: 'g5' },
    { name: 'Calzone Kebap', price: 10.0, desc: 'Gefüllt mit Fleisch vom Drehspieß & Käse', img: 'g4' },
  ]},
  { day: 6, items: null },
];

const WEEKEND_MEAT_OPTIONS = [
  { key: 'haehnchen', label: 'Hähnchen', extra: 0 },
  { key: 'kalb', label: 'Kalb/Rind', extra: 0 },
  { key: 'yaprak', label: 'Yaprak Döner', extra: 1.0 },
];
const DOENER_COMBO = { title: 'Dönerteller + Dose Getränk', price: 12.5, emoji: '🍽️' };
const PIZZA_COMBO_PRICE = 11.0;

function WeekendComboPromo({ go }) {
  const [openDoener, setOpenDoener] = useState(false);
  const [meat, setMeat] = useState('haehnchen');

  const confirmDoener = () => {
    const opt = WEEKEND_MEAT_OPTIONS.find((m) => m.key === meat);
    const total = DOENER_COMBO.price + (opt?.extra || 0);
    go('whatsapp', { pendingCombo: { title: `${DOENER_COMBO.title} (${opt.label})`, price: total } });
  };
  const goToPizzaCombo = () => {
    go('whatsapp', { pizzaComboMode: true });
  };

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="rounded-2xl overflow-hidden" style={{ background: `linear-gradient(120deg, ${CHILI}, ${ORANGE})`, boxShadow: '0 10px 30px rgba(214,40,40,.3)' }}>
        <div className="px-6 pt-7 pb-3 text-center">
          <div className="text-white font-black text-xs tracking-[4px] mb-1.5 animate-pulse">🎉 NUR HEUTE — SAMSTAG</div>
          <div className="text-white font-black text-3xl">Wochenende-Angebot!</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 p-5 pt-2">

          {/* PIZZA CARD — leitet zur echten Pizza-Auswahl */}
          <div className="combo-card rounded-2xl overflow-hidden shadow-lg" style={{ background: '#fff' }}>
            <div className="relative">
              <img src={FOOD_G2} className="w-full h-56 sm:h-64 object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-black text-lg" style={{ background: GOLD, color: GREEN }}>{fmt(PIZZA_COMBO_PRICE)}</div>
            </div>
            <div className="p-4">
              <div className="font-black text-lg mb-1 text-center" style={{ color: GREEN }}>🍕 28cm Pizza + Dose Getränk</div>
              <p className="text-xs text-center mb-3" style={{ color: '#8a7c62' }}>Wähle deine Wunschpizza aus unserer ganzen Pizzakarte!</p>
              <button onClick={goToPizzaCombo} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: ORANGE }}>
                Pizza auswählen →
              </button>
            </div>
          </div>

          {/* DÖNERTELLER CARD */}
          <div className="combo-card rounded-2xl overflow-hidden shadow-lg" style={{ background: '#fff' }}>
            <div className="relative">
              <img src={DOENER_TELLER_IMG} className="w-full h-56 sm:h-64 object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-black text-lg" style={{ background: GOLD, color: GREEN }}>{fmt(DOENER_COMBO.price)}</div>
            </div>
            <div className="p-4">
              <div className="font-black text-lg mb-3 text-center" style={{ color: GREEN }}>{DOENER_COMBO.emoji} {DOENER_COMBO.title}</div>

              {!openDoener && (
                <button onClick={() => { setOpenDoener(true); setMeat('haehnchen'); }} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: ORANGE }}>
                  Auswählen →
                </button>
              )}

              {openDoener && (
                <div>
                  <div className="text-[11px] font-bold mb-2" style={{ color: '#8a7c62' }}>FLEISCH WÄHLEN:</div>
                  <div className="flex flex-col gap-2 mb-3">
                    {WEEKEND_MEAT_OPTIONS.map((m) => (
                      <button key={m.key} onClick={() => setMeat(m.key)} className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold" style={meat === m.key ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN }}>
                        <span>{m.label}</span>
                        <span>{m.extra > 0 ? `+${fmt(m.extra)}` : 'inklusive'}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={confirmDoener} className="w-full py-3 rounded-full font-bold text-sm text-white" style={{ background: CHILI }}>
                    Zur Bestellung hinzufügen
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
        <div className="pb-5" />
      </div>
    </section>
  );
}

function WeekendTeaser({ go }) {
  return (
    <button onClick={() => go('whatsapp')} className="w-full flex items-center justify-center gap-2 flex-wrap text-center py-2.5 px-4 rounded-xl mt-3" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
      <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>🎉 Nur Samstag:</span>
      <span className="text-xs font-semibold" style={{ color: '#8a5a1f' }}>28cm Pizza + Getränk 11,00 € · Dönerteller + Getränk 12,50 €</span>
    </button>
  );
}

function MittagsBanner() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const isLunchDay = [1, 3, 4, 5].includes(day);
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const active = isLunchDay && now >= start && now <= end;
  let mm = 0, ss = 0;
  if (active) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }
  return (
    <section className="py-4" style={{ background: ORANGE }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col items-center justify-center gap-1 text-center" style={active ? { animation: 'urgentPulse 1.6s ease-out infinite' } : {}}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-white font-black text-lg">{active ? '🔥 ' : ''}MITTAGSANGEBOT · 9,50 €</span>
          <span className="text-white text-sm font-semibold opacity-90">
            {active ? `noch ${mm}:${ss.toString().padStart(2, '0')} Min. · inkl. Getränk` : 'Mo.–Fr. 11:30–14:00 Uhr · inkl. Getränk'}
          </span>
        </div>
        <span className="text-white text-xs font-semibold opacity-85">28cm Pizza · Salat · Schnitzel · Nudelgericht</span>
      </div>
    </section>
  );
}

function DailySpecialCard({ item, isLunchWindow, go }) {
  const [open, setOpen] = useState(false);
  const [meat, setMeat] = useState('haehnchen');
  const showMeatChoice = item.name.includes('Kebap');
  const displayPrice = isLunchWindow ? 9.5 : item.price;

  const meatOptions = [
    { key: 'haehnchen', label: 'Hähnchen', extra: 0 },
    { key: 'kalb', label: 'Kalb/Rind', extra: 0 },
  ];

  const addDirect = () => {
    go('whatsapp', { pendingCombo: { title: item.name, price: displayPrice } });
  };
  const confirmMeat = () => {
    const opt = meatOptions.find((m) => m.key === meat);
    go('whatsapp', { pendingCombo: { title: `${item.name} (${opt.label})`, price: displayPrice } });
  };

  return (
    <div className="daily-card rounded-2xl overflow-hidden flex flex-col" style={{ background: GREEN, boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
      <div className="overflow-hidden"><img src={item.imgSrc} className="daily-card-img w-full h-40 object-cover" /></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-white font-black text-lg mb-1">{item.name}</div>
        <div className="text-xs font-medium mb-3" style={{ color: '#d9cdb4' }}>{item.desc}</div>

        {!open && (
          <div className="mt-auto flex items-center gap-3">
            <span className="font-black text-lg" style={{ color: GOLD }}>
              {fmt(displayPrice)}{isLunchWindow && <span className="text-[10px] font-bold ml-1" style={{ color: '#d9cdb4' }}>inkl. Getränk</span>}
            </span>
            <button onClick={() => (showMeatChoice ? (setOpen(true), setMeat('haehnchen')) : addDirect())} className="px-4 py-2 rounded-full font-bold text-xs" style={{ background: ORANGE, color: '#fff' }}>Bestellen →</button>
          </div>
        )}

        {open && (
          <div className="rounded-xl p-3.5 mt-auto" style={{ background: 'rgba(255,255,255,.06)' }}>
            <div className="text-[10px] font-bold mb-2" style={{ color: GOLD }}>FLEISCH WÄHLEN:</div>
            <div className="flex flex-col gap-1.5 mb-3">
              {meatOptions.map((m) => (
                <button key={m.key} onClick={() => setMeat(m.key)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold" style={meat === m.key ? { background: GOLD, color: GREEN } : { background: 'rgba(255,255,255,.1)', color: '#fff' }}>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-full font-semibold text-xs" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>Abbrechen</button>
              <button onClick={confirmMeat} className="flex-1 py-2.5 rounded-full font-bold text-xs text-white" style={{ background: ORANGE }}>Hinzufügen</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DailySpecial({ go }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay();
  const entry = DAILY_SPECIALS[day];
  const imgMap = { g1: FOOD_G1, g2: FOOD_G2, g3: FOOD_G3, g4: FOOD_G4, g5: FOOD_G5 };
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const isLunchDay = [1, 3, 4, 5].includes(day);
  const start = new Date(now); start.setHours(11, 30, 0, 0);
  const end = new Date(now); end.setHours(14, 0, 0, 0);
  const isLunchWindow = isLunchDay && now >= start && now <= end;
  let mm = 0, ss = 0;
  if (isLunchWindow) {
    const diff = end.getTime() - now.getTime();
    mm = Math.floor(diff / 60000);
    ss = Math.floor((diff % 60000) / 1000);
  }

  if (day === 6) {
    return <WeekendComboPromo go={go} />;
  }

  if (day === 2) {
    return (
      <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
        <div className="rounded-2xl p-6 text-center" style={{ background: GREEN, boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
          <div className="text-2xl mb-1.5">😴</div>
          <div className="text-white font-black text-lg mb-1">Heute Ruhetag</div>
          <div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>Wir haben dienstags geschlossen — ab morgen wieder ab 11:30 Uhr für dich da!</div>
          <WeekendTeaser go={go} />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-10 py-4">
      <div className="flex justify-center mb-4">
        <div className="px-6 py-2.5 rounded-full font-black text-sm sm:text-base tracking-[2px] text-center" style={{ background: GREEN, color: GOLD, animation: 'goldGlow 2.6s ease-in-out infinite' }}>
          ⭐ TAGESEMPFEHLUNG · {days[day].toUpperCase()} ⭐
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {entry.items.map((item, i) => (
          <div key={i} style={{ animation: `cardIn .6s cubic-bezier(.22,1,.36,1) ${i * 0.12}s both` }}>
            <DailySpecialCard item={{ ...item, imgSrc: imgMap[item.img] }} isLunchWindow={isLunchWindow} go={go} />
          </div>
        ))}
      </div>

      <WeekendTeaser go={go} />
    </section>
  );
}

function HomeView({ go }) {
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const now = useLiveClock();
  const status = getOpenStatus(now);
  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: `${CREAM} repeating-linear-gradient(135deg, rgba(21,56,38,.025) 0 40px, rgba(21,56,38,0) 40px 80px)`, fontFamily: "'Segoe UI', Arial, sans-serif", minHeight: '100vh', animation: 'pageFade .35s ease' }}>
      <style>{`
        @keyframes pageFade { from{ opacity:0; transform:translateY(8px);} to{ opacity:1; transform:translateY(0);} }
        @keyframes cardIn { from{ opacity:0; transform:translateY(22px) scale(.97);} to{ opacity:1; transform:translateY(0) scale(1);} }
        @keyframes floatY { 0%,100%{ transform:translateY(0px) rotate(-3deg);} 50%{ transform:translateY(-10px) rotate(3deg);} }
        @keyframes floatY2 { 0%,100%{ transform:translateY(0px) rotate(4deg);} 50%{ transform:translateY(-14px) rotate(-4deg);} }
        @keyframes ctaGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,106,26,.55);} 50%{ box-shadow:0 0 0 10px rgba(255,106,26,0);} }
        @keyframes urgentPulse { 0%,100%{ box-shadow:0 0 0 0 rgba(214,40,40,.55);} 50%{ box-shadow:0 0 0 10px rgba(214,40,40,0);} }
        @keyframes goldGlow { 0%,100%{ box-shadow:0 0 0 0 rgba(255,199,56,.45);} 50%{ box-shadow:0 0 14px 4px rgba(255,199,56,.35);} }
        @keyframes liveDot { 0%,100%{ opacity:1; transform:scale(1);} 50%{ opacity:.4; transform:scale(.7);} }
        @keyframes shine { 0%{ background-position:-300px 0;} 100%{ background-position:300px 0;} }
        .feature-card{ transition: transform .25s ease, box-shadow .25s ease; }
        .feature-card:hover{ transform: translateY(-6px) scale(1.015); box-shadow:0 18px 40px rgba(21,56,38,.22); }
        .feature-card:hover .icon-wobble{ animation: floatY .9s ease-in-out infinite; }
        .gallery-img{ transition: transform .4s ease, filter .4s ease; }
        .daily-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .daily-card:hover{ transform: translateY(-4px); box-shadow: 0 16px 34px rgba(21,56,38,.24); }
        .daily-card-img{ transition: transform .5s ease; }
        .daily-card:hover .daily-card-img{ transform: scale(1.06); }
        .combo-card{ transition: transform .3s ease, box-shadow .3s ease; }
        .combo-card:hover{ transform: translateY(-4px); }
        .gallery-img:hover{ transform: scale(1.05); filter: brightness(1.05); }
        .cta-pulse{ animation: ctaGlow 2.2s ease-out infinite; }
        .hero-float{ animation: floatY 4.5s ease-in-out infinite; }
        .hero-float2{ animation: floatY2 5.5s ease-in-out infinite; }
      `}</style>
      <div className="h-1.5 w-full" style={{ background: `repeating-linear-gradient(115deg, ${ORANGE} 0 22px, ${GOLD} 22px 44px, ${CHILI} 44px 66px)` }} />

      {/* NAV */}
      <header className="sticky top-0 z-40" style={{ background: GREEN }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <img src={LOGO_ICON} alt="Bodrum Kebap Vechta" className="w-10 h-10 rounded-full object-contain" style={{ background: CREAM, padding: 3 }} />
            <div>
              <div className="text-white font-black text-sm leading-tight">BODRUM KEBAP</div>
              <div className="text-[10px] font-bold tracking-[3px]" style={{ color: GOLD }}>VECHTA</div>
            </div>
            <div className="flex items-center gap-1.5 ml-1 sm:ml-2 px-2 sm:px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,246,234,.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.open ? '#4ade80' : '#a4906c', animation: status.open ? 'liveDot 1.6s ease-in-out infinite' : 'none' }} />
              <span className="text-[10.5px] font-bold" style={{ color: status.open ? '#4ade80' : '#a49475' }}>{status.label}</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            <button onClick={() => scrollTo('extras')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>Extras</button>
            <button onClick={() => scrollTo('galerie')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>Galerie</button>
            <button onClick={() => scrollTo('kontakt')} className="text-sm font-semibold" style={{ color: '#d9cdb4' }}>Kontakt</button>
            <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)' }} title="@BodrumKebapVechta">
              <Instagram size={16} color="#fff" />
            </a>
            <button onClick={() => go('whatsapp')} className="cta-pulse px-5 py-2.5 rounded-full font-bold text-sm" style={{ background: ORANGE, color: '#fff' }}>Jetzt bestellen</button>
          </nav>
          <button onClick={() => setNavOpen((v) => !v)} className="md:hidden w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.12)' }}>
            {navOpen ? <X size={18} color="#fff" /> : <MenuIcon size={18} color="#fff" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3">
            <button onClick={() => scrollTo('extras')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>Extras</button>
            <a href="https://instagram.com/BodrumKebapVechta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}><Instagram size={15} /> @BodrumKebapVechta</a>
            <button onClick={() => scrollTo('galerie')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>Galerie</button>
            <button onClick={() => scrollTo('kontakt')} className="text-left text-sm font-semibold py-1.5" style={{ color: '#d9cdb4' }}>Kontakt</button>
            <button onClick={() => go('whatsapp')} className="px-5 py-2.5 rounded-full font-bold text-sm text-center" style={{ background: ORANGE, color: '#fff' }}>Jetzt bestellen</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: `linear-gradient(rgba(21,56,38,.88), rgba(21,56,38,.94)), url('${FOOD_HERO}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="hero-float absolute text-5xl select-none pointer-events-none opacity-20" style={{ top: '8%', left: '4%' }}>🥙</div>
        <div className="hero-float2 absolute text-5xl select-none pointer-events-none opacity-20" style={{ bottom: '10%', right: '6%' }}>🍕</div>
        <div className="hero-float absolute text-4xl select-none pointer-events-none opacity-15 hidden lg:block" style={{ top: '55%', left: '46%' }}>🔥</div>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: 'rgba(255,199,56,.15)', color: GOLD, border: '1px solid rgba(255,199,56,.4)' }}>{getGreeting(now)} · ☪ 100% HALAL</div>
            <h1 className="text-white font-black leading-[1.05] mb-4" style={{ fontSize: 'clamp(34px,5vw,58px)' }}>Frisch vom<br /><span style={{ color: ORANGE }}>Drehspieß</span></h1>
            <p className="text-base mb-8 max-w-md" style={{ color: '#d9cdb4' }}>Kebap · Pizza · Rollo · Calzone · Schnitzel · Salat — täglich frisch zubereitet in Vechta.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go('whatsapp')} className="cta-pulse px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: ORANGE, color: '#fff' }}>📱 Per WhatsApp bestellen</button>
              <button onClick={() => scrollTo('extras')} className="px-6 py-3.5 rounded-full font-bold text-sm" style={{ background: 'rgba(255,246,234,.1)', color: CREAM, border: '1px solid rgba(255,246,234,.25)' }}>Mehr entdecken</button>
            </div>
          </div>
          <div className="rounded-2xl p-6 hidden lg:block" style={{ background: 'rgba(255,253,249,.97)' }}>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>Öffnungszeiten</span><span className="font-bold" style={{ color: GREEN }}>Täglich 11:30–22:00</span></div>
            <div className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px dashed #e3d5bd' }}><span className="font-semibold" style={{ color: '#7a6a52' }}>Ruhetag</span><span className="font-bold" style={{ color: CHILI }}>Dienstag</span></div>
            <div className="flex justify-between py-2.5 text-sm"><span className="font-semibold" style={{ color: '#7a6a52' }}>Adresse</span><span className="font-bold text-right" style={{ color: GREEN }}>Oyther Straße 37,<br />49377 Vechta</span></div>
          </div>
        </div>
      </section>

      {/* DAILY SPECIAL */}
      <DailySpecial go={go} />
      <MittagsBanner />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* EXTRAS */}
      <section id="extras" className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="text-center mb-9">
          <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>UNSERE DIGITALEN EXTRAS</div>
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,36px)', color: GREEN }}>Mehr als nur bestellen</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <FeatureCard index={0} icon="📱" title="WhatsApp Bestellung" sub="Menü wählen, direkt zur Abholung senden" color="#25D366" onClick={() => go('whatsapp')} />
          <FeatureCard index={1} icon="🧩" title="Baue deinen Döner" sub="Basis, Fleisch, Soße & Extras selbst wählen" color={GREEN} onClick={() => go('builder')} />
        </div>
        <p className="text-center text-xs font-semibold mt-6" style={{ color: '#a4906c' }}>🚧 Treuekarte & Gruppenbestellung folgen in Kürze!</p>
        <p className="text-center text-xs font-medium mt-6" style={{ color: '#a4906c' }}>🎡 Tipp: Beim Bestellen wartet vor dem Absenden ein Glücksrad mit Gewinnchance!</p>
      </section>

      {/* GALLERY */}
      <section id="galerie" className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
        <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#a4906c' }}>UNSERE TERRASSE</div>
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ boxShadow: '0 10px 30px rgba(21,56,38,.16)' }}>
          <img src={TERRACE_IMG} className="gallery-img w-full h-56 sm:h-72 lg:h-96 object-cover" />
          <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(0deg, rgba(21,56,38,.75) 0%, rgba(21,56,38,0) 45%)' }}>
            <div className="p-5 sm:p-7">
              <div className="text-white font-black text-lg sm:text-2xl">Ein Stück Bodrum in Deutschland</div>
              <div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>Gemütlich draußen sitzen & genießen — direkt bei uns in Vechta.</div>
            </div>
          </div>
        </div>

        <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#a4906c' }}>EIN BLICK IN UNSERE KÜCHE</div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <img src={TERRACE_IMG} onClick={() => setLightbox(TERRACE_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={DOENER_TELLER_IMG} onClick={() => setLightbox(DOENER_TELLER_IMG)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G1} onClick={() => setLightbox(FOOD_G1)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G2} onClick={() => setLightbox(FOOD_G2)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G3} onClick={() => setLightbox(FOOD_G3)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
          <img src={FOOD_G4} onClick={() => setLightbox(FOOD_G4)} className="gallery-img rounded-xl object-cover w-full h-40 lg:h-52 cursor-pointer" />
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ background: 'rgba(21,56,38,.92)', animation: 'viewFade .25s ease' }}>
          <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.15)' }}>
            <X size={20} color="#fff" />
          </button>
          <img src={lightbox} className="max-w-full max-h-full rounded-2xl object-contain" style={{ boxShadow: '0 20px 60px rgba(0,0,0,.5)' }} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* MAP / CONTACT */}
      <section id="kontakt" className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="text-center mb-9">
          <div className="text-xs font-bold tracking-[3px] mb-2" style={{ color: '#e4550a' }}>BESUCH UNS</div>
          <h2 className="font-black" style={{ fontSize: 'clamp(26px,4vw,36px)', color: GREEN }}>So findest du uns</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ background: GREEN }}>
            <div className="flex items-start gap-3 mb-4"><MapPin size={18} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">Oyther Straße 37</div><div className="text-sm font-medium" style={{ color: '#d9cdb4' }}>49377 Vechta</div></div></div>
            <div className="flex items-start gap-3 mb-4"><Phone size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><div className="text-white font-bold text-sm">04441 / 95 16 104</div></div>
            <div className="flex items-start gap-3 mb-6"><Clock3 size={16} color={GOLD} className="mt-0.5 flex-shrink-0" /><div><div className="text-white font-bold text-sm">Täglich 11:30–22:00 Uhr</div><div className="text-xs font-medium" style={{ color: '#d9cdb4' }}>Dienstag Ruhetag</div></div></div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Oyther+Stra%C3%9Fe+37%2C+49377+Vechta"
                target="_blank" rel="noopener noreferrer"
                className="cta-pulse inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: ORANGE, color: '#fff' }}
              >
                📍 Route planen
              </a>
              <a
                href="https://instagram.com/BodrumKebapVechta"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm w-fit"
                style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)', color: '#fff' }}
              >
                <Instagram size={16} /> @BodrumKebapVechta
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: 280, boxShadow: '0 10px 30px rgba(21,56,38,.14)' }}>
            <iframe
              title="Bodrum Kebap Vechta Standort"
              src="https://www.google.com/maps?q=Oyther+Stra%C3%9Fe+37,+49377+Vechta&output=embed"
              width="100%" height="100%" style={{ border: 0, minHeight: 280 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: GREEN }} className="mt-4">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={LOGO_ICON} alt="logo" className="w-8 h-8 rounded-full object-contain" style={{ background: CREAM, padding: 2 }} />
            <span className="text-white font-black text-xs">BODRUM KEBAP VECHTA</span>
          </div>
          <span className="text-[11px] font-medium" style={{ color: '#6b5a3e' }}>© 2026 Bodrum Kebap Vechta</span>
        </div>
      </footer>
    </div>
  );
}

/* ============ WHATSAPP ORDER ============ */
function WhatsAppOrderView({ back, initialAction, onConsumeAction }) {
  const [tab, setTab] = useState(initialAction?.pizzaComboMode ? 'pizza' : MENU[0].key);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [openExtra, setOpenExtra] = useState(null);
  const [configExtras, setConfigExtras] = useState([]);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [drawerView, setDrawerView] = useState('cart');
  const [wheelResult, setWheelResult] = useState(null);
  const [pizzaComboActive, setPizzaComboActive] = useState(!!initialAction?.pizzaComboMode);

  const addItem = (lineKey, label, price) => setCart((c) => ({ ...c, [lineKey]: { name: label, price, qty: (c[lineKey]?.qty || 0) + 1 } }));

  useEffect(() => {
    if (initialAction?.pendingCombo) {
      const key = `combo-${Date.now()}`;
      setCart((c) => ({ ...c, [key]: { name: `🎉 ${initialAction.pendingCombo.title}`, price: initialAction.pendingCombo.price, qty: 1 } }));
      setDrawerView('upsell');
      setCartOpen(true);
    }
    onConsumeAction && onConsumeAction();
  }, []);

  const addPizzaCombo = (item) => {
    const key = `combo-pizza-${item.id}`;
    setCart((c) => ({ ...c, [key]: { name: `🎉 ${item.name} (28cm, Wochenende-Angebot inkl. Getränk)`, price: PIZZA_COMBO_PRICE, qty: (c[key]?.qty || 0) + 1 } }));
  };

  const removeItem = (lineKey) => setCart((c) => {
    const ex = c[lineKey]; if (!ex) return c;
    if (ex.qty <= 1) { const cp = { ...c }; delete cp[lineKey]; return cp; }
    return { ...c, [lineKey]: { ...ex, qty: ex.qty - 1 } };
  });

  const lines = Object.entries(cart);
  const totalCount = lines.reduce((s, [, v]) => s + v.qty, 0);
  const totalPrice = lines.reduce((s, [, v]) => s + v.qty * v.price, 0);

  const waLink = useMemo(() => {
    if (lines.length === 0) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte gerne folgendes bestellen:\n\n`;
    lines.forEach(([, v]) => { msg += `• ${v.qty}x ${v.name} (${fmt(v.qty * v.price)})\n`; });
    msg += `\nGesamt: ${fmt(totalPrice)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (note) msg += `\nHinweis: ${note}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [lines, totalPrice, name, note, wheelResult]);

  const activeCategory = MENU.find((m) => m.key === tab);

  return (
    <div className="pb-24">
      <div style={{ background: GREEN }}><TopBar onHome={back} title="WHATSAPP BESTELLUNG" /></div>

      <div className="flex gap-2 overflow-x-auto px-5 pt-4 pb-2">
        {MENU.map((m) => (
          <button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
            style={tab === m.key ? { background: GREEN, color: GOLD } : { background: 'transparent', color: GREEN, border: `1.5px solid ${GREEN}` }}>
            {CATEGORY_ICONS[m.key]} {m.label}
          </button>
        ))}
      </div>


      {pizzaComboActive && tab === 'pizza' && (
        <div className="mx-5 mt-3 mb-1 px-4 py-3 rounded-xl flex items-center justify-between gap-2 flex-wrap" style={{ background: '#fdecd4', border: '1px solid #f0d4a8' }}>
          <span className="text-xs font-black" style={{ color: '#8a5a1f' }}>🎉 Wochenende-Angebot: Wähle deine 28cm Pizza für {fmt(PIZZA_COMBO_PRICE)} inkl. Getränk!</span>
          <button onClick={() => setPizzaComboActive(false)} className="text-[11px] font-bold underline" style={{ color: '#8a5a1f' }}>Angebot verlassen</button>
        </div>
      )}

      <div className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start">
        {activeCategory.items.map((item) => {
          if (item.priceSmall !== undefined) {
            if (pizzaComboActive && tab === 'pizza') {
              return (
                <div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-2" style={{ borderLeft: `4px solid ${GOLD}` }}>
                  <div>
                    <div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{item.name}</div>
                    {item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{item.desc}</div>}
                  </div>
                  <button onClick={() => addPizzaCombo(item)} className="flex-none px-3.5 py-2.5 rounded-lg text-xs font-black text-white text-center" style={{ background: ORANGE }}>Wählen<br />{fmt(PIZZA_COMBO_PRICE)}</button>
                </div>
              );
            }
            const isOpen = openExtra?.itemId === item.id;
            const size = openExtra?.size;
            const basePrice = size === 'klein' ? item.priceSmall : item.priceLarge;
            const configTotal = isOpen ? basePrice + configExtras.length * 1.0 : 0;
            const openFor = (sz) => { setOpenExtra({ itemId: item.id, size: sz }); setConfigExtras([]); };
            const toggleExtra = (t) => setConfigExtras((ex) => (ex.includes(t) ? ex.filter((x) => x !== t) : [...ex, t]));
            const confirmAdd = () => {
              const sizeLabel = size === 'klein' ? 'klein' : 'groß';
              const label = configExtras.length > 0 ? `${item.name} (${sizeLabel}) – ${configExtras.join(', ')}` : `${item.name} (${sizeLabel})`;
              const lineKey = `${item.id}-${size}-${configExtras.slice().sort().join('_') || 'ohne'}`;
              addItem(lineKey, label, configTotal);
              setOpenExtra(null); setConfigExtras([]);
            };
            return (
              <div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                <div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{item.name}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>
                {item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{item.desc}</div>}
                <div className="flex gap-2">
                  <button onClick={() => openFor('klein')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'klein' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>klein · {fmt(item.priceSmall)}</button>
                  <button onClick={() => openFor('gross')} className="flex-1 px-2.5 py-2.5 rounded-lg text-[11px] font-bold" style={isOpen && size === 'gross' ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: '#7c6d55' }}>groß · {fmt(item.priceLarge)}</button>
                </div>
                {isOpen && (
                  <div className="mt-3 pt-3" style={{ borderTop: '1px dashed #e3d5bd' }}>
                    <div className="text-[11px] font-bold mb-2" style={{ color: '#8a5a1f' }}>Extras (je {fmt(1.0)}):</div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {EXTRA_TOPPINGS.map((t) => (
                        <button key={t} onClick={() => toggleExtra(t)} className="px-2 py-1.5 rounded-lg text-[10.5px] font-bold" style={configExtras.includes(t) ? { background: GREEN, color: GOLD } : { background: '#f7f0e2', color: GREEN, border: '1px solid #e3d5bd' }}>{t}</button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setOpenExtra(null); setConfigExtras([]); }} className="px-4 py-2.5 rounded-lg text-xs font-semibold" style={{ background: '#f0e5cf', color: GREEN }}>Abbrechen</button>
                      <button onClick={confirmAdd} className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white" style={{ background: ORANGE }}>Zum Warenkorb · {fmt(configTotal)}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          const qty = cart[item.id]?.qty || 0;
          return (
            <div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              <div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{item.name}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{item.desc}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div>
              <Stepper qty={qty} onAdd={() => addItem(item.id, item.name, item.price)} onRemove={() => removeItem(item.id)} />
            </div>
          );
        })}
      </div>

      {totalCount > 0 && !cartOpen && (
        <button onClick={() => { setCartOpen(true); setDrawerView('upsell'); }} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px] rounded-2xl px-5 py-4 flex items-center justify-between shadow-xl" style={{ background: ORANGE, color: '#fff' }}>
          <span className="flex items-center gap-2 font-bold text-sm"><ShoppingBag size={18} /> {totalCount} Artikel</span>
          <span className="font-black text-base">{fmt(totalPrice)}</span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="w-full max-w-md h-full flex flex-col" style={{ background: CREAM }}>
            <div style={{ background: GREEN }} className="px-5 py-5 flex items-center gap-3">
              <button onClick={() => (drawerView === 'wheel' ? setDrawerView('cart') : setCartOpen(false))} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,246,234,.12)' }}><ChevronLeft size={18} color="#fff" /></button>
              <div className="text-white font-extrabold text-sm">{drawerView === 'wheel' ? 'Glücksrad 🎡' : drawerView === 'upsell' ? 'Noch etwas dazu?' : 'Deine Bestellung'}</div>
            </div>

            {drawerView === 'upsell' && (
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">🍟🥤</div>
                  <div className="font-black text-lg" style={{ color: GREEN }}>Möchtest du noch etwas dazu?</div>
                  <p className="text-sm mt-1" style={{ color: '#7c6d55' }}>Diese Klassiker passen perfekt zu deiner Bestellung!</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {UPSELL_ITEMS.map((u) => {
                    const key = u.id;
                    const qty = cart[key]?.qty || 0;
                    return (
                      <div key={u.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{u.emoji}</span>
                          <div>
                            <div className="font-bold text-sm" style={{ color: GREEN }}>{u.name}</div>
                            <div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(u.price)}</div>
                          </div>
                        </div>
                        <Stepper qty={qty} onAdd={() => addItem(u.id, u.name, u.price)} onRemove={() => removeItem(u.id)} />
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setDrawerView('cart')} className="w-full mt-6 py-3.5 rounded-xl font-bold text-base text-white" style={{ background: GREEN }}>Weiter zur Bestellung</button>
                <button onClick={() => setDrawerView('cart')} className="w-full mt-2 py-2.5 rounded-xl font-semibold text-xs" style={{ color: '#a4906c' }}>Nein danke, überspringen</button>
              </div>
            )}

            {drawerView === 'wheel' && (
              <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col items-center">
                <p className="text-sm text-center mb-5" style={{ color: '#6b5a3e' }}>Dreh einmal — dein Gewinn wird automatisch zur Bestellung hinzugefügt!</p>
                <WheelWidget compact onWin={(res) => setWheelResult(res)} />
                {wheelResult && (
                  <button onClick={() => setDrawerView('cart')} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>Weiter zur Bestellung</button>
                )}
              </div>
            )}

            {drawerView === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {lines.length === 0 && <p className="text-sm text-center mt-10" style={{ color: '#8a7c62' }}>Dein Warenkorb ist leer.</p>}
                  <div className="flex flex-col gap-2.5">
                    {lines.map(([key, v]) => (
                      <div key={key} className="bg-white rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                        <div><div className="font-bold text-sm" style={{ color: GREEN }}>{v.name}</div><div className="text-xs font-semibold" style={{ color: CHILI }}>{fmt(v.price)} / Stück</div></div>
                        <Stepper qty={v.qty} onAdd={() => addItem(key, v.name, v.price)} onRemove={() => removeItem(key)} />
                      </div>
                    ))}
                  </div>

                  {lines.length > 0 && !wheelResult && totalPrice >= 30 && (
                    <div className="mt-4"><WheelPromoBanner onClick={() => setDrawerView('wheel')} /></div>
                  )}
                  {lines.length > 0 && !wheelResult && totalPrice < 30 && (
                    <div className="mt-4 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                      🎡 Noch {fmt(30 - totalPrice)} bis zum Glücksrad — ab 30,00 € Bestellwert!
                    </div>
                  )}
                  {wheelResult && wheelResult.code && (
                    <div className="w-full mt-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN }}>
                      <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>Gewonnen: {wheelResult.prize} — wird mitgeschickt</span>
                    </div>
                  )}

                  {lines.length > 0 && (
                    <div className="mt-6 flex flex-col gap-3">
                      <p className="text-xs font-medium -mt-1" style={{ color: '#8a7c62' }}>Die Abholzeit bestätigen wir euch direkt per WhatsApp-Antwort.</p>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name" className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
                      <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Anmerkung (optional)" rows={2} className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none resize-none" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />
                    </div>
                  )}
                </div>
                {lines.length > 0 && (
                  <div className="px-5 py-4" style={{ borderTop: '1px solid #e3d5bd', background: '#fff' }}>
                    <div className="flex justify-between items-center mb-3"><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>Gesamt</span><span className="text-lg font-black" style={{ color: GREEN }}>{fmt(totalPrice)}</span></div>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2" style={{ background: '#25D366', color: '#fff' }}><MessageCircle size={18} /> Per WhatsApp senden</a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ DÖNER BUILDER ============ */
const BASES = [
  { id: 'brot', label: 'Im Brot (klassisch)', desc: 'Klassischer Döner im Fladenbrot', price: 8.0, emoji: '🥙' },
  { id: 'duerum', label: 'Dürüm', desc: 'Im Lavasbrot gerollt', price: 9.0, emoji: '🌯' },
  { id: 'teller', label: 'Teller', desc: 'Mit Pommes', price: 12.0, emoji: '🍽️' },
  { id: 'box', label: 'Box', desc: 'Mit Pommes & Soße', price: 8.0, emoji: '🥡' },
];
const MEATS = [
  { id: 'kalb', label: 'Kalbfleisch', extra: 0, emoji: '🥩' },
  { id: 'haehnchen', label: 'Hähnchen', extra: 0, emoji: '🍗' },
  { id: 'gemischt', label: 'Gemischt', extra: 0.5, emoji: '🍖' },
  { id: 'steak', label: 'Steakfleisch', extra: 2.0, emoji: '🔥' },
  { id: 'falafel', label: 'Falafel (vegetarisch)', extra: -1.0, emoji: '🧆' },
];
const SAUCES = [
  { id: 'knoblauch', label: 'Knoblauchsoße' }, { id: 'hollandaise', label: 'Hollandaise' },
  { id: 'scharf', label: 'Scharfe Soße' }, { id: 'joghurt', label: 'Joghurtsoße' }, { id: 'ohne', label: 'Ohne Soße' },
];
const BUILDER_EXTRAS = [
  { id: 'kaese', label: 'Käse', price: 1.0 }, { id: 'peperoni', label: 'Peperoni', price: 1.0 },
  { id: 'zwiebeln', label: 'Zwiebeln', price: 0 }, { id: 'tomaten', label: 'Tomaten', price: 0 },
  { id: 'rotkohl', label: 'Rotkohl', price: 0 }, { id: 'mais', label: 'Mais', price: 1.0 },
  { id: 'extrafleisch', label: 'Extra Fleisch', price: 2.0 },
];
function OptionCard({ selected, onClick, children }) {
  return (
    <button onClick={onClick} className="w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between" style={selected ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}>
      {children}{selected && <Check size={18} />}
    </button>
  );
}
function DonerBuilderView({ back }) {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(null);
  const [meat, setMeat] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [extras, setExtras] = useState([]);
  const [name, setName] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);

  const toggleExtra = (id) => setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));
  const total = useMemo(() => {
    let t = (base?.price || 0) + (meat?.extra || 0);
    extras.forEach((id) => { const ex = BUILDER_EXTRAS.find((e) => e.id === id); if (ex) t += ex.price; });
    return Math.max(t, 0);
  }, [base, meat, extras]);
  const canNext = [!!base, !!meat, !!sauce, true, false][step];

  const waLink = useMemo(() => {
    if (!base || !meat || !sauce) return null;
    let msg = `Hallo Bodrum Kebap Vechta, ich möchte mir gerne meinen Döner selbst zusammenstellen:\n\n`;
    msg += `🌯 Basis: ${base.label}\n🍖 Fleisch: ${meat.label}\n🧂 Soße: ${SAUCES.find((s) => s.id === sauce)?.label}\n`;
    if (extras.length > 0) msg += `➕ Extras: ${extras.map((id) => BUILDER_EXTRAS.find((e) => e.id === id)?.label).join(', ')}\n`;
    msg += `\nPreis: ${fmt(total)}\n`;
    if (name) msg += `\nName: ${name}`;
    if (wheelResult && wheelResult.code) msg += `\n\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})`;
    msg += `\n\n(Abholung, keine Lieferung) Bitte sagt mir kurz, wann die Bestellung abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [base, meat, sauce, extras, name, total, wheelResult]);

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title="DEIN DÖNER" /></div>
      {step < 4 && (
        <div className="flex items-center gap-2 px-5 mb-2">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-1.5 rounded-full flex-1" style={{ background: i <= step ? ORANGE : '#e3d5bd' }} />)}
        </div>
      )}
      <div className="px-5 pt-3">
        {step === 0 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>Wähle deine Basis</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>Wie soll dein Döner serviert werden?</p>
          <div className="flex flex-col gap-2.5">{BASES.map((b) => (<OptionCard key={b.id} selected={base?.id === b.id} onClick={() => setBase(b)}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{b.emoji}</span> {b.label}<span className="text-xs font-medium opacity-80">· {b.desc}</span></span></OptionCard>))}</div></div>)}
        {step === 1 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>Welches Fleisch?</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>Wähle dein Lieblingsfleisch.</p>
          <div className="flex flex-col gap-2.5">{MEATS.map((m) => (<OptionCard key={m.id} selected={meat?.id === m.id} onClick={() => setMeat(m)}><span className="font-bold text-sm flex items-center gap-2.5"><span className="text-lg">{m.emoji}</span> {m.label}{m.extra !== 0 && <span className="text-xs font-medium opacity-80">({m.extra > 0 ? '+' : ''}{fmt(m.extra)})</span>}</span></OptionCard>))}</div></div>)}
        {step === 2 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>Welche Soße?</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>Eine Soße aussuchen.</p>
          <div className="flex flex-col gap-2.5">{SAUCES.map((s) => (<OptionCard key={s.id} selected={sauce === s.id} onClick={() => setSauce(s.id)}><span className="font-bold text-sm">{s.label}</span></OptionCard>))}</div></div>)}
        {step === 3 && (<div><h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>Extras dazu?</h2><p className="text-sm mb-5" style={{ color: '#7c6d55' }}>So viele du möchtest — optional.</p>
          <div className="grid grid-cols-2 gap-2.5">{BUILDER_EXTRAS.map((e) => { const sel = extras.includes(e.id); return (<button key={e.id} onClick={() => toggleExtra(e.id)} className="px-3.5 py-3 rounded-xl text-left" style={sel ? { background: ORANGE, color: '#fff' } : { background: '#fff', color: GREEN, border: '1px solid #e3d5bd' }}><div className="font-bold text-sm">{e.label}</div><div className="text-[11px] font-medium opacity-80 mt-0.5">{e.price > 0 ? `+${fmt(e.price)}` : 'gratis'}</div></button>); })}</div></div>)}
        {step === 4 && !showWheel && (
          <div>
            <h2 className="font-black text-xl mb-1" style={{ color: GREEN }}>Dein Döner ist fertig! 🎉</h2>
            <p className="text-sm mb-5" style={{ color: '#7c6d55' }}>Kurz prüfen und abschicken.</p>
            <div className="bg-white rounded-xl p-5 mb-4" style={{ borderLeft: `4px solid ${ORANGE}` }}>
              <Row label="Basis" value={base?.label} /><Row label="Fleisch" value={meat?.label} /><Row label="Soße" value={SAUCES.find((s) => s.id === sauce)?.label} />
              {extras.length > 0 && <Row label="Extras" value={extras.map((id) => BUILDER_EXTRAS.find((e) => e.id === id)?.label).join(', ')} />}
              <div className="flex justify-between items-center pt-3 mt-2" style={{ borderTop: '1px dashed #e3d5bd' }}><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>Preis</span><span className="text-xl font-black" style={{ color: GREEN }}>{fmt(total)}</span></div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name" className="w-full px-4 py-3 rounded-xl text-sm font-semibold outline-none mb-3" style={{ background: '#fff', border: '1px solid #e3d5bd', color: GREEN }} />

            {!wheelResult && total >= 30 && (
              <div className="mb-4"><WheelPromoBanner onClick={() => setShowWheel(true)} /></div>
            )}
            {!wheelResult && total < 30 && (
              <div className="mb-4 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                🎡 Noch {fmt(30 - total)} bis zum Glücksrad — ab 30,00 € Bestellwert!
              </div>
            )}
            {wheelResult && wheelResult.code && (
              <div className="w-full mb-4 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN }}>
                <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>Gewonnen: {wheelResult.prize} — wird mitgeschickt</span>
              </div>
            )}

            <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mb-3" style={{ background: '#25D366', color: '#fff' }}><MessageCircle size={18} /> Per WhatsApp bestellen</a>
          </div>
        )}
        {step === 4 && showWheel && (
          <div>
            <button onClick={() => setShowWheel(false)} className="mb-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: GREEN }}><ArrowLeft size={13} /> Zurück zur Bestellung</button>
            <h2 className="font-black text-xl mb-1 text-center" style={{ color: GREEN }}>Glücksrad 🎡</h2>
            <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>Dein Gewinn wird automatisch zur Bestellung hinzugefügt!</p>
            <WheelWidget compact onWin={(res) => setWheelResult(res)} />
            {wheelResult && (
              <button onClick={() => setShowWheel(false)} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>Weiter zur Bestellung</button>
            )}
          </div>
        )}
      </div>
      {step < 4 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px]">
          <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-xl disabled:opacity-40" style={{ background: ORANGE, color: '#fff' }}>Weiter <ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
function Row({ label, value }) {
  return <div className="flex justify-between items-start py-1.5 gap-3"><span className="text-xs font-semibold flex-shrink-0" style={{ color: '#a4906c' }}>{label}</span><span className="text-sm font-bold text-right" style={{ color: GREEN }}>{value}</span></div>;
}

/* ============ GROUP ORDER ============ */
function makeGroupCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < 5; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function GroupOrderView({ back }) {
  const [view, setView] = useState('home');
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [name, setName] = useState('');
  const [tab, setTab] = useState(MENU[0].key);
  const [localCart, setLocalCart] = useState({});
  const [group, setGroup] = useState(null);
  const [err, setErr] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [wheelResult, setWheelResult] = useState(null);

  const loadGroup = async (c) => { const data = await safeGet(`grouporder:${c}`); setGroup(data || { code: c, people: [] }); };
  useEffect(() => {
    if (view === 'order' || view === 'summary') {
      loadGroup(code);
      const t = setInterval(() => loadGroup(code), 4000);
      return () => clearInterval(t);
    }
  }, [view, code]);

  const startGroup = async () => { const c = makeGroupCode(); await safeSet(`grouporder:${c}`, { code: c, people: [] }); setCode(c); setView('create'); };
  const joinGroup = async () => {
    const c = codeInput.trim().toUpperCase(); if (c.length < 4) return;
    const data = await safeGet(`grouporder:${c}`);
    if (!data) { setErr('Diesen Code gibt es nicht.'); return; }
    setErr(''); setCode(c); setGroup(data); setView('name');
  };
  const addLocal = (id, label, price) => setLocalCart((c) => ({ ...c, [id]: { name: label, price, qty: (c[id]?.qty || 0) + 1 } }));
  const removeLocal = (id) => setLocalCart((c) => { const ex = c[id]; if (!ex) return c; if (ex.qty <= 1) { const cp = { ...c }; delete cp[id]; return cp; } return { ...c, [id]: { ...ex, qty: ex.qty - 1 } }; });
  const myLines = Object.entries(localCart);
  const myTotal = myLines.reduce((s, [, v]) => s + v.qty * v.price, 0);
  const submitMyOrder = async () => {
    if (myLines.length === 0) return;
    const fresh = (await safeGet(`grouporder:${code}`)) || { code, people: [] };
    const people = fresh.people.filter((p) => p.name !== name);
    people.push({ name, items: myLines.map(([, v]) => ({ name: v.name, price: v.price, qty: v.qty })), total: myTotal });
    const updated = { ...fresh, people };
    await safeSet(`grouporder:${code}`, updated); setGroup(updated); setView('summary');
  };
  const grandTotal = useMemo(() => (group ? group.people.reduce((s, p) => s + p.total, 0) : 0), [group]);
  const waFinalLink = useMemo(() => {
    if (!group || group.people.length === 0) return null;
    let msg = `Hallo Bodrum Kebap Vechta, Gruppenbestellung (Code ${code}):\n`;
    group.people.forEach((p) => { msg += `\n👤 ${p.name}:\n`; p.items.forEach((it) => { msg += `  • ${it.qty}x ${it.name} (${fmt(it.qty * it.price)})\n`; }); });
    msg += `\nGesamt: ${fmt(grandTotal)}\n`;
    if (wheelResult && wheelResult.code) msg += `\n🎁 Glücksrad-Gewinn: ${wheelResult.prize} (Code: ${wheelResult.code})\n`;
    msg += `\n(Abholung, keine Lieferung) Bitte sagt uns, wann es abholbereit ist. Danke!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [group, grandTotal, code, wheelResult]);
  const activeCategory = MENU.find((m) => m.key === tab);

  return (
    <div className="pb-24">
      <div style={{ background: GREEN }}><TopBar onHome={back} title="GRUPPENBESTELLUNG" /></div>

      {view === 'home' && (
        <div className="px-5 pt-4 flex flex-col gap-3">
          <button onClick={startGroup} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-base" style={{ background: ORANGE, color: '#fff' }}><Plus size={20} /> Neue Gruppenbestellung starten</button>
          <button onClick={() => setView('join')} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-base" style={{ background: '#f0e5cf', color: GREEN }}><Users size={20} /> Mit Code beitreten</button>
        </div>
      )}
      {view === 'join' && (
        <div className="px-5 pt-4">
          <input value={codeInput} onChange={(e) => { setCodeInput(e.target.value.toUpperCase()); setErr(''); }} placeholder="Code z. B. K7XQ2" className="w-full px-4 py-3.5 rounded-xl text-lg font-bold tracking-[0.25em] text-center outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          {err && <p className="text-sm font-semibold mb-3" style={{ color: CHILI }}>{err}</p>}
          <button onClick={joinGroup} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: ORANGE, color: '#fff' }}>Beitreten</button>
        </div>
      )}
      {view === 'create' && (
        <div className="px-5 pt-4 text-center">
          <p className="text-sm mb-4" style={{ color: '#7c6d55' }}>Teile diesen Code mit deiner Gruppe:</p>
          <div className="rounded-2xl py-6 mb-4" style={{ background: '#f7f0e2' }}><div className="text-4xl font-black tracking-[0.3em]" style={{ color: GREEN }}>{code}</div></div>
          <button onClick={() => setView('name')} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: ORANGE, color: '#fff' }}>Weiter zu meiner Bestellung</button>
        </div>
      )}
      {view === 'name' && (
        <div className="px-5 pt-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dein Name" className="w-full px-4 py-3.5 rounded-xl text-base font-semibold outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => name && setView('order')} disabled={!name} className="w-full py-3.5 rounded-xl font-bold text-base disabled:opacity-50" style={{ background: ORANGE, color: '#fff' }}>Weiter zur Speisekarte</button>
        </div>
      )}
      {view === 'order' && (
        <div>
          <div className="flex gap-2 overflow-x-auto px-5 pt-2 pb-2">
            {MENU.map((m) => (<button key={m.key} onClick={() => setTab(m.key)} className="flex-none px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap" style={tab === m.key ? { background: GREEN, color: GOLD } : { background: 'transparent', color: GREEN, border: `1.5px solid ${GREEN}` }}>{CATEGORY_ICONS[m.key]} {m.label}</button>))}
          </div>
          <div className="px-5 pt-2 grid md:grid-cols-2 xl:grid-cols-3 gap-2.5 items-start">
            {activeCategory.items.map((item) => {
              if (item.priceSmall !== undefined) {
                const keyS = `${item.id}-s`, keyL = `${item.id}-l`;
                return (<div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm" style={{ borderLeft: `4px solid ${ORANGE}` }}><div className="font-bold text-sm mb-1" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{item.name}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>{item.desc && <div className="text-[11px] font-medium mb-2" style={{ color: '#8a7c62' }}>{item.desc}</div>}<div className="flex gap-2"><QtyRow label={`klein · ${fmt(item.priceSmall)}`} qty={localCart[keyS]?.qty || 0} onAdd={() => addLocal(keyS, `${item.name} (klein)`, item.priceSmall)} onRemove={() => removeLocal(keyS)} /><QtyRow label={`groß · ${fmt(item.priceLarge)}`} qty={localCart[keyL]?.qty || 0} onAdd={() => addLocal(keyL, `${item.name} (groß)`, item.priceLarge)} onRemove={() => removeLocal(keyL)} /></div></div>);
              }
              const qty = localCart[item.id]?.qty || 0;
              return (<div key={item.id} className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between" style={{ borderLeft: `4px solid ${ORANGE}` }}><div><div className="font-bold text-sm" style={{ color: GREEN }}>{menuNum(item.id) && (<><span style={{ color: ORANGE }}>{menuNum(item.id)}</span> · </>)}{item.name}{item.weekend && <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full align-middle" style={{ background: CHILI, color: '#fff' }}>NUR FR+SA+SO</span>}</div>{item.desc && <div className="text-[11px] font-medium mt-0.5" style={{ color: '#8a7c62' }}>{item.desc}</div>}<div className="text-xs font-semibold mt-1" style={{ color: CHILI }}>{fmt(item.price)}</div></div><Stepper qty={qty} onAdd={() => addLocal(item.id, item.name, item.price)} onRemove={() => removeLocal(item.id)} /></div>);
            })}
          </div>
          {myLines.length > 0 && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[360px] rounded-2xl shadow-xl overflow-hidden">
              <button onClick={submitMyOrder} className="w-full px-5 py-4 flex items-center justify-between" style={{ background: ORANGE, color: '#fff' }}><span className="flex items-center gap-2 font-bold text-sm"><ShoppingBag size={18} /> Meine Bestellung abschicken</span><span className="font-black text-base">{fmt(myTotal)}</span></button>
            </div>
          )}
        </div>
      )}
      {view === 'summary' && !showWheel && (
        <div className="px-5 pt-2">
          <div className="mb-4 px-4 py-2.5 rounded-xl text-sm font-semibold text-center" style={{ background: '#fdecd4', color: '#8a5a1f' }}>✓ Deine Bestellung wurde hinzugefügt</div>
          <div className="flex items-center justify-between mb-3"><span className="text-xs font-bold" style={{ color: '#a4906c' }}>{group?.people.length || 0} Personen bestellt</span><button onClick={() => loadGroup(code)} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: '#7c6d55' }}><RefreshCw size={12} /> Aktualisieren</button></div>
          <div className="flex flex-col gap-2.5 mb-4">
            {(group?.people || []).map((p, i) => (<div key={i} className="bg-white rounded-xl p-4"><div className="flex justify-between items-center mb-2"><span className="font-bold text-sm" style={{ color: GREEN }}>👤 {p.name}</span><span className="font-bold text-sm" style={{ color: CHILI }}>{fmt(p.total)}</span></div>{p.items.map((it, j) => (<div key={j} className="text-xs font-medium" style={{ color: '#7c6d55' }}>{it.qty}x {it.name}</div>))}</div>))}
          </div>
          <button onClick={() => setView('order')} className="w-full py-3 rounded-xl font-semibold text-sm mb-3" style={{ background: '#f0e5cf', color: GREEN }}>+ Meine Bestellung ändern</button>
          {group && group.people.length > 0 && (
            <div className="bg-white rounded-xl p-4">
              <div className="flex justify-between items-center mb-3"><span className="text-sm font-semibold" style={{ color: '#7c6d55' }}>Gesamt (alle)</span><span className="text-lg font-black" style={{ color: GREEN }}>{fmt(grandTotal)}</span></div>
              {!wheelResult && grandTotal >= 30 && (
                <div className="mb-3"><WheelPromoBanner onClick={() => setShowWheel(true)} /></div>
              )}
              {!wheelResult && grandTotal < 30 && (
                <div className="mb-3 text-center text-xs font-semibold px-4 py-2.5 rounded-xl" style={{ background: '#f7f0e2', color: '#8a7c62' }}>
                  🎡 Noch {fmt(30 - grandTotal)} bis zum Glücksrad — ab 30,00 € Bestellwert!
                </div>
              )}
              {wheelResult && wheelResult.code && (
                <div className="w-full mb-3 px-4 py-3 rounded-xl flex items-center gap-2" style={{ background: GREEN }}>
                  <Gift size={16} color={GOLD} /><span className="text-xs font-bold" style={{ color: GOLD }}>Gewonnen: {wheelResult.prize} — wird mitgeschickt</span>
                </div>
              )}
              <a href={waFinalLink} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2" style={{ background: '#25D366', color: '#fff' }}><MessageCircle size={18} /> Gesamtbestellung an WhatsApp senden</a>
            </div>
          )}
        </div>
      )}
      {view === 'summary' && showWheel && (
        <div className="px-5 pt-2">
          <button onClick={() => setShowWheel(false)} className="mb-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#f0e5cf', color: GREEN }}><ArrowLeft size={13} /> Zurück zur Übersicht</button>
          <h2 className="font-black text-xl mb-1 text-center" style={{ color: GREEN }}>Glücksrad 🎡</h2>
          <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>Dein Gewinn wird automatisch zur Gesamtbestellung hinzugefügt!</p>
          <WheelWidget compact onWin={(res) => setWheelResult(res)} />
          {wheelResult && (
            <button onClick={() => setShowWheel(false)} className="mt-4 w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>Weiter zur Übersicht</button>
          )}
        </div>
      )}
    </div>
  );
}

/* ============ LUCKY WHEEL (standalone view incl. staff verify) ============ */
function StaffPanelView({ back }) {
  const [pin, setPin] = useState('');
  const [ok, setOk] = useState(false);
  const [tab, setTab] = useState('stamps'); // stamps | wheel

  const [stampCode, setStampCode] = useState('');
  const [stampCustomer, setStampCustomer] = useState(undefined);
  const [msg, setMsg] = useState('');

  const [wheelCode, setWheelCode] = useState('');
  const [wheelResult, setWheelResult] = useState(undefined);
  const [redeemMsg, setRedeemMsg] = useState('');

  const stampSearch = async () => {
    const c = stampCode.trim().toUpperCase(); if (!c) return;
    setStampCustomer(await safeGet(`loyalty:${c}`));
    setMsg('');
  };
  const addStamp = async () => {
    if (!stampCustomer) return;
    const c = stampCode.trim().toUpperCase();
    const updated = { ...stampCustomer, stamps: stampCustomer.stamps + 1 };
    await safeSet(`loyalty:${c}`, updated); setStampCustomer(updated); setMsg('Stempel hinzugefügt ✓');
  };
  const redeemStamp = async () => {
    if (!stampCustomer || stampCustomer.stamps < LOYALTY_GOAL) return;
    const c = stampCode.trim().toUpperCase();
    const updated = { ...stampCustomer, stamps: stampCustomer.stamps - LOYALTY_GOAL, rewardsRedeemed: (stampCustomer.rewardsRedeemed || 0) + 1 };
    await safeSet(`loyalty:${c}`, updated); setStampCustomer(updated); setMsg('Gratis-Portion eingelöst ✓');
  };

  const wheelSearch = async () => {
    const c = wheelCode.trim().toUpperCase(); if (!c) return;
    setWheelResult(await safeGet(`spincode:${c}`)); setRedeemMsg('');
  };
  const wheelRedeem = async () => {
    if (!wheelResult) return;
    const c = wheelCode.trim().toUpperCase();
    const updated = { ...wheelResult, redeemed: true, redeemedAt: new Date().toISOString() };
    await safeSet(`spincode:${c}`, updated); setWheelResult(updated); setRedeemMsg('✓ Eingelöst');
  };

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title="PERSONAL-BEREICH" /></div>

      {!ok ? (
        <div className="px-5 pt-4">
          <input value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && pin === '1234' && setOk(true)} type="password" inputMode="numeric" placeholder="PIN ••••" className="w-full px-4 py-3.5 rounded-xl text-lg font-bold tracking-[0.3em] text-center outline-none mb-3" style={{ background: '#f7f0e2', color: GREEN }} />
          <button onClick={() => pin === '1234' && setOk(true)} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: ORANGE, color: '#fff' }}>Anmelden</button>
          <p className="text-[11px] text-center mt-3" style={{ color: '#a4906c' }}>Standard-PIN: 1234</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 px-5 pt-2 pb-4">
            <button onClick={() => setTab('stamps')} className="flex-1 py-2.5 rounded-full text-xs font-bold" style={tab === 'stamps' ? { background: GREEN, color: GOLD } : { background: '#f0e5cf', color: GREEN }}>🎟️ Treuekarte</button>
            <button onClick={() => setTab('wheel')} className="flex-1 py-2.5 rounded-full text-xs font-bold" style={tab === 'wheel' ? { background: GREEN, color: GOLD } : { background: '#f0e5cf', color: GREEN }}>🎡 Glücksrad-Code</button>
          </div>

          {tab === 'stamps' && (
            <div className="px-5">
              <div className="flex gap-2 mb-4">
                <input value={stampCode} onChange={(e) => setStampCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && stampSearch()} placeholder="Kunden-Code" className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.1em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                <button onClick={stampSearch} className="px-5 rounded-xl font-bold text-sm" style={{ background: ORANGE, color: '#fff' }}>Suchen</button>
              </div>
              {stampCustomer === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>Code nicht gefunden.</p>}
              {stampCustomer && (
                <div className="bg-white rounded-xl p-5">
                  <div className="text-lg font-black mb-4" style={{ color: GREEN }}>{stampCustomer.stamps} / {LOYALTY_GOAL} Stempel</div>
                  <StampRow stamps={stampCustomer.stamps} goal={LOYALTY_GOAL} />
                  <div className="flex gap-2 mt-5">
                    <button onClick={addStamp} className="flex-1 py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>+1 Stempel</button>
                    <button onClick={redeemStamp} disabled={stampCustomer.stamps < LOYALTY_GOAL} className="flex-1 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-40" style={{ background: CHILI }}>Einlösen</button>
                  </div>
                </div>
              )}
              {msg && <p className="text-center text-sm font-bold mt-4" style={{ color: '#8a5a1f' }}>{msg}</p>}
            </div>
          )}

          {tab === 'wheel' && (
            <div className="px-5">
              <div className="flex gap-2 mb-4">
                <input value={wheelCode} onChange={(e) => setWheelCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && wheelSearch()} placeholder="Gewinn-Code" className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.1em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
                <button onClick={wheelSearch} className="px-5 rounded-xl font-bold text-sm" style={{ background: ORANGE, color: '#fff' }}>Suchen</button>
              </div>
              {wheelResult === null && <p className="text-sm font-semibold text-center" style={{ color: CHILI }}>Code nicht gefunden.</p>}
              {wheelResult && (
                <div className="bg-white rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3"><ShieldCheck size={18} color={wheelResult.redeemed ? '#a4906c' : '#34a065'} /><span className="font-bold text-sm" style={{ color: GREEN }}>{wheelResult.redeemed ? 'Bereits eingelöst' : 'Gültig'}</span></div>
                  <div className="text-lg font-black mb-4" style={{ color: GREEN }}>{wheelResult.prize}</div>
                  {!wheelResult.redeemed && <button onClick={wheelRedeem} className="w-full py-3 rounded-xl font-bold text-sm text-white" style={{ background: GREEN }}>Einlösen bestätigen</button>}
                  {redeemMsg && <p className="text-center text-sm font-bold mt-3" style={{ color: '#8a5a1f' }}>{redeemMsg}</p>}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ============ LOYALTY (Treuekarte) ============ */
const LOYALTY_GOAL = 8;
function StampRow({ stamps, goal }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: goal }).map((_, i) => {
        const filled = i < stamps;
        return (<div key={i} className="aspect-square rounded-full flex items-center justify-center border-2" style={{ background: filled ? ORANGE : 'transparent', borderColor: filled ? ORANGE : '#d8c6a3', borderStyle: filled ? 'solid' : 'dashed' }}>{filled ? <Check size={20} color="#fff" strokeWidth={3} /> : <Flame size={16} color="#d8c6a3" />}</div>);
      })}
    </div>
  );
}
function makeLoyaltyCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = ''; for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
function LoyaltyView({ back }) {
  const [codeInput, setCodeInput] = useState('');
  const [customer, setCustomer] = useState(undefined);
  const [justCreated, setJustCreated] = useState(false);

  const openCard = async (code) => {
    const data = await safeGet(`loyalty:${code}`);
    setCustomer(data || null);
  };
  const lookup = async () => {
    const c = codeInput.trim().toUpperCase(); if (!c) return;
    await openCard(c);
  };
  const createNew = async () => {
    let code = makeLoyaltyCode();
    while (await safeGet(`loyalty:${code}`)) code = makeLoyaltyCode();
    const data = { code, stamps: 0, rewardsRedeemed: 0 };
    await safeSet(`loyalty:${code}`, data);
    setCustomer(data);
    setJustCreated(true);
  };

  return (
    <div className="pb-10">
      <div style={{ background: GREEN }}><TopBar onHome={back} title="TREUEKARTE" /></div>

      {customer === undefined && (
        <div className="px-5 pt-4">
          <p className="text-sm mb-5 text-center" style={{ color: '#7c6d55' }}>Keine Telefonnummer nötig — deine Karte läuft über einen persönlichen Code.</p>
          <label className="block text-xs font-bold mb-2" style={{ color: '#a4906c' }}>ICH HABE SCHON EINEN CODE</label>
          <div className="flex gap-2 mb-6">
            <input value={codeInput} onChange={(e) => setCodeInput(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && lookup()} placeholder="Z. B. K7XQ2M" className="flex-1 px-4 py-3 rounded-xl text-base font-bold tracking-[0.15em] outline-none" style={{ background: '#f7f0e2', color: GREEN }} />
            <button onClick={lookup} className="px-5 rounded-xl font-bold text-sm" style={{ background: GREEN, color: GOLD }}>Anzeigen</button>
          </div>
          <div className="text-center text-xs font-semibold mb-3" style={{ color: '#a4906c' }}>— oder —</div>
          <button onClick={createNew} className="w-full py-3.5 rounded-xl font-bold text-base" style={{ background: ORANGE, color: '#fff' }}>Neue Treuekarte erstellen</button>
        </div>
      )}

      {customer === null && (
        <div className="px-5 pt-6 text-center">
          <p className="text-sm font-semibold mb-4" style={{ color: CHILI }}>Diesen Code gibt es nicht.</p>
          <button onClick={() => setCustomer(undefined)} className="px-5 py-2.5 rounded-xl font-semibold text-sm" style={{ background: '#f0e5cf', color: GREEN }}>Zurück</button>
        </div>
      )}

      {customer && (
        <div className="px-5 pt-4">
          {justCreated && (
            <div className="mb-4 px-4 py-3 rounded-xl text-xs font-semibold" style={{ background: '#fdecd4', color: '#8a5a1f', border: '1px solid #f0d4a8' }}>
              📸 Bitte den Code notieren oder einen Screenshot machen — er ist dein einziger Zugang zur Karte!
            </div>
          )}
          <div className="bg-white rounded-xl p-6" style={{ borderLeft: `5px solid ${ORANGE}` }}>
            <div className="text-center mb-4">
              <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: '#a4906c' }}>DEIN CODE</div>
              <div className="text-2xl font-black tracking-[0.25em]" style={{ color: GREEN }}>{customer.code}</div>
            </div>
            <div className="text-lg font-black mb-5 text-center" style={{ color: GREEN }}>{customer.stamps} / {LOYALTY_GOAL} Stempel</div>
            <StampRow stamps={customer.stamps} goal={LOYALTY_GOAL} />
            <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px dashed #e3d5bd' }}>
              {customer.stamps >= LOYALTY_GOAL ? <div className="font-bold" style={{ color: CHILI }}>🎉 Gratis-Portion verdient!</div> : <div className="text-sm font-semibold" style={{ color: '#7c6d55' }}>Noch {LOYALTY_GOAL - customer.stamps} Stempel bis zur Gratis-Portion</div>}
            </div>
          </div>
          <p className="text-xs text-center mt-4" style={{ color: '#a4906c' }}>Zeig deinen Code an der Kasse, damit wir einen Stempel hinzufügen können.</p>
        </div>
      )}
    </div>
  );
}

/* ============ APP ============ */
export default function App() {
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState('home');
  const [pendingAction, setPendingAction] = useState(null);
  const go = (v, action) => { if (action) setPendingAction(action); setView(v); };

  if (!booted) return <SplashScreen onDone={() => setBooted(true)} />;

  if (view === 'home') {
    return <HomeView go={go} />;
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ background: GREEN, fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <style>{`
        @keyframes sideFloat1 { 0%,100%{ transform:translateY(0) rotate(-6deg);} 50%{ transform:translateY(-22px) rotate(6deg);} }
        @keyframes sideFloat2 { 0%,100%{ transform:translateY(0) rotate(5deg);} 50%{ transform:translateY(-30px) rotate(-5deg);} }
        @keyframes sideFloat3 { 0%,100%{ transform:translateY(0) rotate(0deg);} 50%{ transform:translateY(-16px) rotate(10deg);} }
        @keyframes sideSpin { from{ transform:rotate(0deg);} to{ transform:rotate(360deg);} }
        @keyframes viewFade { from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
      `}</style>

      {/* decorative side stripe */}
      <div className="absolute inset-y-0 left-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />
      <div className="absolute inset-y-0 right-0 w-2" style={{ background: `repeating-linear-gradient(180deg, ${ORANGE} 0 24px, ${GOLD} 24px 48px, #d62828 48px 72px)` }} />

      {/* floating decorations — only visible when there's real side space */}
      <div className="hidden 2xl:flex flex-col items-center gap-10 fixed left-10 top-1/3 opacity-90 pointer-events-none">
        <span style={{ fontSize: 46, animation: 'sideFloat1 5s ease-in-out infinite' }}>🥙</span>
        <span style={{ fontSize: 34, animation: 'sideSpin 9s linear infinite', display: 'inline-block' }}>🍕</span>
        <span style={{ fontSize: 30, animation: 'sideFloat3 4.5s ease-in-out infinite' }}>🌶️</span>
      </div>
      <div className="hidden 2xl:flex flex-col items-center gap-10 fixed right-10 top-1/4 opacity-90 pointer-events-none">
        <span style={{ fontSize: 40, animation: 'sideFloat2 6s ease-in-out infinite' }}>🍔</span>
        <span style={{ fontSize: 30, animation: 'sideFloat1 5.5s ease-in-out infinite' }}>🥤</span>
        <span style={{ fontSize: 36, animation: 'sideSpin 7s linear infinite reverse', display: 'inline-block' }}>🔥</span>
      </div>
      <div className="hidden 2xl:block fixed left-10 bottom-16 opacity-80 pointer-events-none" style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 2, writingMode: 'vertical-rl' }}>
        100% HALAL
      </div>
      <div className="hidden 2xl:block fixed right-10 bottom-16 opacity-80 pointer-events-none" style={{ fontSize: 12, color: GOLD, fontWeight: 700, letterSpacing: 2, writingMode: 'vertical-rl' }}>
        FRISCH VOM DREHSPIESS
      </div>

      <div key={view} className="w-full max-w-5xl mx-auto relative" style={{ background: CREAM, animation: 'viewFade .35s ease' }}>
        {view === 'whatsapp' && <WhatsAppOrderView back={() => setView('home')} initialAction={pendingAction} onConsumeAction={() => setPendingAction(null)} />}
        {view === 'builder' && <DonerBuilderView back={() => setView('home')} />}
        {view === 'group' && <GroupOrderView back={() => setView('home')} />}
        {view === 'loyalty' && <LoyaltyView back={() => setView('home')} />}
        {view === 'staff' && <StaffPanelView back={() => setView('home')} />}
      </div>
    </div>
  );
}
