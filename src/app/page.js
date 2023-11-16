'use client';
import Image from 'next/image';
import styles from './page.module.css';
import logo from './images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tableData, setData] = useState([]);

  useEffect(() => {
    console.log("in eff")
    getData();
  }, []);
  
  const getData = async () => {
    try {
      const url = 'https://bi5onbo6tl.execute-api.us-west-2.amazonaws.com/prod/s3/all';

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      setData(response.data); // Assuming the response is an array of data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generateDataTable = () => {
    const data = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        id: i,
        name: `Name ${i}`,
        type: `Type ${i}`,
        createdAt: `Date ${i}`,
        tags: `Tag ${i}`,
      });
    }
    return data;
  };

  const dataTable = tableData.length > 0 ? tableData : generateDataTable();

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <a className={styles.navImage} href='#'>
          <Image src={logo} width={103} height={89} />
          <span className={styles.navTitle}>Extracta</span>
        </a>
        <div className={styles.navDiv}></div>
      </nav>
      <div style={{ textAlign: 'center' }}>
        <div className={styles.mainBody}>
          <div
            className={`table-responsive ${styles.tableContainer}`}
            style={{ height: '60vh', overflowY: 'auto' }}
          >
            <table
              className="table table-striped table-hover"
              style={{ width: '100%', backgroundColor: '#A69CAC !important', borderCollapse: 'collapse', fontSize: '1.2rem' }}
            >
              <thead>
                <tr>
                  <th className={styles.th} style={{ width: '25%' }}>
                    Name
                  </th>
                  <th className={styles.th} style={{ width: '20%' }}>
                    Type
                  </th>
                  <th className={styles.th} style={{ width: '20%' }}>
                    Created At
                  </th>
                  <th className={styles.th} style={{ width: '25%' }}>
                    Tags
                  </th>
                  <th className={styles.th} style={{ width: '10%' }}>
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.id}>
                    <td className={styles.td} style={{ width: '25%' }}>
                      {row.name}
                    </td>
                    <td className={styles.td} style={{ width: '20%' }}>
                      {row.type}
                    </td>
                    <td className={styles.td} style={{ width: '20%' }}>
                      {row.createdAt}
                    </td>
                    <td className={styles.td} style={{ width: '25%' }}>
                      {row.tags}
                    </td>
                    <td className={styles.td} style={{ width: '10%' }}>
                      <a className={`btn ${styles.downloadButton}`} style={{ display: 'flex', backgroundColor: 'inherit', boxShadow: 'none', fontSize: 20, border: 'solid 0px white', padding: 2 }}>
                        <FontAwesomeIcon icon={faDownload} style={{ height: 20 }} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
