import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 protected readonly title = signal('smart-learning-tracker-ui');
  currentYear = new Date().getFullYear();
  isDarkMode = false;

  // ✅ Dependencies go HERE
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(
      this.isDarkMode ? 'theme-dark' : 'theme-light'
    );
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        // fallback safety
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}
