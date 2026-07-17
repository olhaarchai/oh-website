import { Box, Typography, Paper, Chip, Stack, Divider, Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import TranslateIcon from '@mui/icons-material/Translate'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import GitHubIcon from '@mui/icons-material/GitHub'
import PipelineFlow from '../components/PipelineFlow'

const tags = [
  'Chrome extension',
  'Manifest V3',
  'TypeScript',
  'On-device AI',
  'Built-in Translator API',
  'Language Detector API',
  'Side panel',
  'IndexedDB',
  'Web Speech',
  'esbuild',
  'Vitest',
  'Privacy-first',
]

const decisions: { title: string; body: string }[] = [
  {
    title: 'On-device by construction, not by policy',
    body: 'Translation and language detection run entirely in the browser through Chrome’s built-in Translator and Language Detector APIs. The extension makes no network requests of its own — there is no backend to send text to, no account, and no telemetry. Privacy is a property of the architecture, not a promise in a document.',
  },
  {
    title: 'Translate, then remember',
    body: 'Looking a word up and forgetting it is the real failure mode. Saved translations go into a personal vocabulary in IndexedDB, browsable from a side panel and reviewable as multiple-choice flashcards — turning passive reading into retention.',
  },
  {
    title: 'Read aloud with on-device voices only',
    body: 'Both the original and the translation can be spoken via the Web Speech API. It deliberately filters to on-device voices and skips network-backed ones, so the text being read never leaves the machine.',
  },
  {
    title: 'Minimal permissions, honestly justified',
    body: 'One-click translation means the content script runs on all http(s) pages, which triggers the “read your data on all websites” warning and a deeper store review. It reads only the user’s active selection to render the bubble locally — and the privacy policy and permission justifications state exactly that.',
  },
]

export default function TranslatePage() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <TranslateIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h3" fontWeight={700}>
          Kotiq Translate
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
        ))}
      </Stack>

      <Paper
        variant="outlined"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          mb: 3,
          px: 1.75,
          py: 0.75,
          borderRadius: 2,
          borderColor: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.12),
          color: 'success.main',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
      >
        🚧 Feature-complete · preparing for the Chrome Web Store
      </Paper>

      <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          href="https://kotiq.dev/kotiq-translate/"
          target="_blank"
          rel="noopener noreferrer"
        >
          kotiq.dev/kotiq-translate
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href="https://github.com/olhaarchai/ext-translator"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Button>
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 2, lineHeight: 1.8 }}>
        Reading a foreign-language page usually means switching to a translator tab — and the words you
        look up are gone the moment the tab closes. Most tools either ship your text to a cloud service or
        stop at translation without helping you retain anything.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mb: 5, lineHeight: 1.8 }}>
        <strong>Kotiq Translate</strong> translates any text you select <strong>right on the page</strong>,{' '}
        <strong>fully on-device</strong> via the browser’s built-in translation model — then lets you save
        what you looked up into a personal vocabulary and review it with flashcards. It can read the
        original or the translation aloud, and nothing you read or save ever leaves your browser.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Approach &amp; key decisions
      </Typography>
      <Stack component="ul" spacing={1.5} sx={{ maxWidth: 760, pl: 3, mt: 1, mb: 5 }}>
        {decisions.map((d) => (
          <Typography
            key={d.title}
            component="li"
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            <strong>{d.title}</strong> — {d.body}
          </Typography>
        ))}
      </Stack>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Flow
      </Typography>
      <Box sx={{ mt: 1, mb: 1.5 }}>
        <PipelineFlow steps={['Select text', 'On-device translate', 'Save to vocabulary', 'Review with flashcards']} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        Translation appears in place; saved words become a personal deck you can review later — all in the browser.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" color="text.secondary">
        <strong>Status:</strong> feature-complete and preparing for the Chrome Web Store. Manifest V3 in
        TypeScript, built with esbuild and unit-tested with Vitest. Desktop Chrome 138+ (the built-in
        translation APIs are desktop-only).
      </Typography>
    </Box>
  )
}
