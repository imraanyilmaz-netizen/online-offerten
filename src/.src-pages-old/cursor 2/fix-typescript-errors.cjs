const fs = require('fs');
const path = require('path');

console.log('🔧 TypeScript hataları düzeltiliyor...\n');

// TypeScript hatalarını düzelt
function fixTypeScriptErrors(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file)) {
        fixTypeScriptErrors(filePath);
      }
    } else if (file.endsWith('.tsx')) {
      try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Event handler type'larını düzelt
        // handleInputChange = (e) => -> handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        if (content.includes('const handleInputChange = (e) =>')) {
          content = content.replace(
            /const handleInputChange = \(e\) =>/g,
            'const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>'
          );
          modified = true;
        }
        
        // handlePasswordChange = (e) => -> handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        if (content.includes('const handlePasswordChange = (e) =>')) {
          content = content.replace(
            /const handlePasswordChange = \(e\) =>/g,
            'const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>'
          );
          modified = true;
        }
        
        // handleAmountChange = (e) => -> handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        if (content.includes('const handleAmountChange = (e) =>')) {
          content = content.replace(
            /const handleAmountChange = \(e\) =>/g,
            'const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>'
          );
          modified = true;
        }
        
        // onClick handler'ları
        if (content.includes('onClick={(e) =>') && !content.includes('React.MouseEvent')) {
          content = content.replace(
            /onClick=\{\(e\) =>/g,
            'onClick={(e: React.MouseEvent) =>'
          );
          modified = true;
        }
        
        // onSubmit handler'ları
        if (content.includes('onSubmit={(e) =>') && !content.includes('React.FormEvent')) {
          content = content.replace(
            /onSubmit=\{\(e\) =>/g,
            'onSubmit={(e: React.FormEvent) =>'
          );
          modified = true;
        }
        
        // useState type'larını düzelt
        // useState(null) -> useState<number | null>(null)
        if (content.includes('useState(null)') && content.includes('setMinAmount')) {
          content = content.replace(
            /const \[minAmount, setMinAmount\] = useState\(null\)/g,
            'const [minAmount, setMinAmount] = useState<number | null>(null)'
          );
          modified = true;
        }
        
        // Error handling
        if (content.includes('catch (e)') && content.includes('e.message')) {
          content = content.replace(
            /} catch \(e\) \{[\s\S]*?description: e\.message/g,
            (match) => {
              return match.replace(
                /description: e\.message/g,
                'description: e instanceof Error ? e.message : String(e)'
              );
            }
          );
          modified = true;
        }
        
        if (modified) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ ${filePath} düzeltildi`);
        }
      } catch (error) {
        console.log(`⚠️  ${filePath} işlenemedi: ${error.message}`);
      }
    }
  });
}

// components dizinini düzelt
const componentsDir = path.join(process.cwd(), 'components');
if (fs.existsSync(componentsDir)) {
  fixTypeScriptErrors(componentsDir);
}

console.log('\n🎉 TypeScript hataları düzeltildi!');

