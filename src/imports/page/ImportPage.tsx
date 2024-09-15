import React, { useState } from 'react';
import { Button, Input, Link } from '@adminjs/design-system';
import { styles } from './ImportPage.styles.js';

export default function ImportPage() {
  const [url, setUrl] = useState('');
  const [output, setOutput] = useState('');
  const [inProcess, setInProcess] = useState(false);

  function start() {
    setInProcess(true);

    fetch('/imports/from-psrozklad', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async ({ body }) => {
        const reader = body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          setOutput((prev) => decoder.decode(value, { stream: true }) + prev);
        }

        setInProcess(false);
      })
      .catch((error) => {
        setOutput((prev) => `Error fetching stream: ${error}\n${prev}`);
        setInProcess(false);
      });
  }

  return (
    <div style={styles.mainWindow}>
      <Link>Dashboard</Link>
      <span> / </span> <Link>Import Resources</Link>
      <h2 style={styles.title}>Import Resources</h2>
      <div style={styles.container}>
        <div style={styles.containerHeader}>
          <Input
            placeholder="Enter the URL export page of PSRozklad"
            onChange={({ target }) => setUrl(target.value)}
            disabled={inProcess}
            value={url}
            width={400}
          />
          <Button
            disabled={inProcess}
            variant="contained"
            onClick={start}
            style={styles.startBtn}
          >
            Start
          </Button>
        </div>

        <div hidden={!output} style={styles.outputContainer}>
          {output}
        </div>
      </div>
    </div>
  );
}
