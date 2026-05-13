import { Injectable } from '@angular/core';

export type AppTheme = 'theme-default' | 'theme-dark' | 'theme-forest';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly themes: AppTheme[] = [
    'theme-default',
    'theme-dark',
    'theme-forest',
  ];

  initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    this.applyTheme(savedTheme ?? 'theme-default');
  }

  getCurrentTheme(): AppTheme {
    return (this.getSavedTheme() ?? 'theme-default') as AppTheme;
  }

  getAvailableThemes(): AppTheme[] {
    return [...this.themes];
  }

  applyTheme(theme: AppTheme): void {
    document.body.classList.remove(...this.themes);
    document.body.classList.add(theme);
    sessionStorage.setItem(this.storageKey, theme);
  }

  private getSavedTheme(): AppTheme | null {
    const theme = sessionStorage.getItem(this.storageKey) as AppTheme | null;
    return theme && this.themes.includes(theme) ? theme : null;
  }
}
