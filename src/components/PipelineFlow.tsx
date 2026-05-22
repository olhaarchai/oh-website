import { Box, Chip, Stack, Typography } from '@mui/material'

interface Props {
  steps: string[]
}

/** Compact left-to-right flow: chips separated by arrows, wrapping on small screens. */
export default function PipelineFlow({ steps }: Props) {
  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
      {steps.map((step, i) => (
        <Box key={step} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label={step} size="small" color="primary" variant="outlined" />
          {i < steps.length - 1 && (
            <Typography component="span" color="text.disabled" sx={{ userSelect: 'none' }}>
              →
            </Typography>
          )}
        </Box>
      ))}
    </Stack>
  )
}
