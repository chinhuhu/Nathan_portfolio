import { execFileSync } from 'child_process';
import path from 'path';

test('public asset references stay valid', () => {
  const scriptPath = path.join(process.cwd(), 'scripts', 'check-public-assets.js');

  expect(() => {
    execFileSync(process.execPath, [scriptPath], {
      cwd: process.cwd(),
      stdio: 'pipe',
    });
  }).not.toThrow();
});
