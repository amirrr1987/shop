export function getApiErrorMessage(err: unknown, fallback: string) {
  if (
    err &&
    typeof err === 'object' &&
    'data' in err &&
    err.data &&
    typeof err.data === 'object' &&
    'message' in err.data
  ) {
    const message = (err.data as { message?: string | string[] }).message
    if (Array.isArray(message)) {
      return message.join(', ')
    }
    if (typeof message === 'string') {
      return message
    }
  }

  return fallback
}
