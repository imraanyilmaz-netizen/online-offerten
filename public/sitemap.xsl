<![CDATA[<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                exclude-result-prefixes="sitemap">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>XML Sitemap</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #f8f9fa;
            color: #212529;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
          }
          header h1 {
            margin: 0;
            font-size: 2em;
          }
          header p {
            margin: 5px 0 0;
            opacity: 0.9;
          }
          .sitemap-table {
            width: 100%;
            border-collapse: collapse;
          }
          .sitemap-table th, .sitemap-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
            word-break: break-word;
          }
          .sitemap-table th {
            background-color: #f1f3f5;
            font-weight: 600;
          }
          .sitemap-table tbody tr:hover {
            background-color: #f8f9fa;
          }
          .sitemap-table a {
            color: #007bff;
            text-decoration: none;
            font-weight: 500;
          }
          .sitemap-table a:hover {
            text-decoration: underline;
          }
          @media (max-width: 768px) {
            .sitemap-table thead {
              display: none;
            }
            .sitemap-table, .sitemap-table tbody, .sitemap-table tr, .sitemap-table td {
              display: block;
              width: 100%;
            }
            .sitemap-table tr {
              margin-bottom: 15px;
              border: 1px solid #dee2e6;
              border-radius: 4px;
            }
            .sitemap-table td {
              text-align: right;
              padding-left: 50%;
              position: relative;
              border-bottom: 0;
            }
            .sitemap-table td:before {
              content: attr(data-label);
              position: absolute;
              left: 15px;
              width: calc(50% - 30px);
              padding-right: 10px;
              white-space: nowrap;
              text-align: left;
              font-weight: 600;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>XML Sitemap</h1>
            <p>This sitemap is intended for search engines but has been styled for human readability.</p>
          </header>
          <table class="sitemap-table">
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td data-label="URL">
                    <xsl:variable name="loc" select="sitemap:loc"/>
                    <a href="{$loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td data-label="Last Modified">
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td data-label="Change Frequency">
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td data-label="Priority">
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>]]>