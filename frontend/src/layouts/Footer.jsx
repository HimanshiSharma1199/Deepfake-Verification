import { Link } from 'react-router-dom';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../constants/navigation';

const links = {
  Product: ['Features', 'Pricing', 'API', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Trust Center', 'Security', 'Status'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'DPA'],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-bold">{APP_NAME}</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xs">{APP_TAGLINE}. Built for newsrooms, governments, and enterprises.</p>
            <div className="mt-4 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary-600 hover:border-primary-300 dark:hover:border-primary-700 transition-colors" aria-label="Social link">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built for a national hackathon.</p>
        </div>
      </div>
    </footer>
  );
}
