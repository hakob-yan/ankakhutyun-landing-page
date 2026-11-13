import type { Language } from '@/data/site';

declare namespace App {
  interface Locals {
    language: Language;
  }
}
