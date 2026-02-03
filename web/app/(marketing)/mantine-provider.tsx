"use client";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

const theme = createTheme({
  fontFamily: 'var(--font-family-base)',
  colors: {
    primary: [
      'rgba(50, 184, 198, 0.1)', 'rgba(50, 184, 198, 0.2)', 'rgba(50, 184, 198, 0.3)',
      'rgba(50, 184, 198, 0.4)', 'rgba(50, 184, 198, 0.5)', 'var(--color-teal-300)',
      'rgba(45, 166, 178, 1)', 'rgba(33, 128, 141, 1)', 'rgba(29, 116, 128, 1)', 'rgba(19, 52, 59, 1)'
    ],
  },
  primaryColor: 'primary',
  defaultRadius: 'var(--radius-base)',
  components: {
    Container: {
      defaultProps: {
        size: 1200,
        styles: { root: { paddingTop: 'calc(var(--navbar-height) + 20px)', paddingBottom: '80px' } }
      }
    },
    Card: {
      defaultProps: { withBorder: false },
      styles: {
        root: {
          backgroundColor: 'transparent !important',
          border: '1px solid rgba(255, 255, 255, 0.1) !important',
          backdropFilter: 'blur(10px)',
          color: 'var(--color-gray-200) !important',
          boxShadow: 'none !important'
        },
        section: { padding: 0 }
      }
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: 'transparent !important',
          border: '1px solid rgba(255, 255, 255, 0.1) !important',
          backdropFilter: 'blur(10px)',
          color: 'var(--color-gray-200) !important'
        }
      }
    },
    Title: {
      styles: {
        root: {
          color: 'var(--color-gray-200) !important',
          fontWeight: 'var(--font-weight-semibold) !important'
        }
      }
    },
    Text: {
      styles: {
        root: { color: 'var(--color-gray-200) !important' }
      }
    },
    Button: {
      styles: {
        root: {
          backgroundColor: 'var(--color-surface) !important',
          borderColor: 'var(--color-border) !important',
          color: 'var(--color-text) !important',
          '&:hover': {
            backgroundColor: 'var(--color-primary) !important',
            color: 'var(--color-slate-900) !important'
          }
        }
      }
    }
  }
});

export default function MantineClientProvider({ children }: { children: React.ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
