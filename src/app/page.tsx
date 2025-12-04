'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SchoolIcon from '@mui/icons-material/School';
import HistoryIcon from '@mui/icons-material/History';

// Create a light theme instance
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3', // Bright Blue
    },
    secondary: {
      main: '#ff9800', // Orange for accents
    },
    background: {
      default: '#ffffff',
      paper: '#f5f9ff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    }
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      color: '#1a237e',
    },
    h2: {
      fontWeight: 700,
      color: '#1a237e',
    },
    h3: {
      fontWeight: 700,
      color: '#2c3e50',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default function LandingPage() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoFixHighIcon /> AI English Coach
            </Typography>
            <Button variant="outlined" color="primary" sx={{ px: 3 }}>
              Login
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 2, px: 3, boxShadow: 'none' }}>
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            pt: { xs: 15, md: 20 },
            pb: { xs: 10, md: 15 },
            background: 'linear-gradient(135deg, #f5f9ff 0%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ mb: 2, display: 'inline-block', px: 2, py: 0.5, borderRadius: 20, bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                  <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>
                    NEW: Claude Haiku 4.5 Powered
                  </Typography>
                </Box>
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.1, mb: 3 }}>
                  英語学習を、<br />
                  <span style={{ color: '#2196f3' }}>もっと自由に、</span><br />
                  <span style={{ color: '#ff9800' }}>もっと確実に。</span>
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.6 }}>
                  AIがあなたの専属コーチとして、24時間365日サポート。<br />
                  <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}><br /></Box>
                  自然な表現と丁寧な解説で、自信を持って英語を使えるようになります。
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button variant="contained" size="large" sx={{ py: 1.5, px: 5, fontSize: '1.1rem', boxShadow: '0 8px 20px rgba(33, 150, 243, 0.25)' }}>
                    無料で始める
                  </Button>
                  <Button variant="text" size="large" sx={{ py: 1.5, px: 3, fontSize: '1.1rem', color: 'text.secondary' }}>
                    機能を見る ↓
                  </Button>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  component="img"
                  src="/hero_bright.png"
                  alt="Modern Workspace"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'transform 0.5s',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg)',
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container sx={{ py: 15 }} maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Why Choose Us
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              忙しいあなたのために、効率的で効果的な学習体験をデザインしました。
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <AutoFixHighIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
                title: 'AIによる即時添削',
                desc: '待つことなく、その場ですぐにフィードバック。文法ミスだけでなく、より自然な表現も提案します。'
              },
              {
                icon: <SchoolIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
                title: '詳細な解説',
                desc: 'なぜ間違っているのか、どう直すべきかを丁寧に説明。ただ直すだけでなく、学習につながる気づきを提供します。'
              },
              {
                icon: <HistoryIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
                title: '学習履歴の管理',
                desc: '過去の添削内容を自動で保存。自分の弱点や成長の過程をいつでも振り返ることができます。'
              }
            ].map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{
                  height: '100%',
                  p: 2,
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 3, p: 2, borderRadius: '50%', bgcolor: 'rgba(33, 150, 243, 0.05)', display: 'inline-flex' }}>
                      {feature.icon}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* About / Illustration Section */}
        <Box sx={{ bgcolor: '#f5f9ff', py: 15 }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
                <Box
                  component="img"
                  src="/feature_illustration.png"
                  alt="Learning Illustration"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 10px 40px rgba(33, 150, 243, 0.15)',
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3 }}>
                  楽しみながら、<br />
                  着実にスキルアップ。
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                  難しい文法用語ばかりの解説で挫折したことはありませんか？<br />
                  私たちのAIは、まるで友人のように分かりやすく、かつ的確にアドバイスします。
                </Typography>
                <Stack spacing={2}>
                  {[
                    'ビジネスメールの添削',
                    '日常会話のニュアンス確認',
                    'アカデミックなエッセイの校正'
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>✓</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 15, textAlign: 'center', background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', color: 'white' }}>
          <Container maxWidth="sm">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 800, color: 'white' }}>
              さあ、新しい英語学習を<br />始めましょう。
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, color: 'white' }}>
              登録は無料。クレジットカードも不要です。
            </Typography>
            <Button variant="contained" size="large" sx={{
              py: 2, px: 8,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}>
              無料でアカウント作成
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ py: 6, textAlign: 'center', bgcolor: '#ffffff', borderTop: '1px solid #f0f0f0' }}>
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} AI English Coach. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
