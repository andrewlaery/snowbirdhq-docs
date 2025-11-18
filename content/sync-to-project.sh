#!/bin/bash

# Snowbird HQ Content Sync Script
# Syncs content from Obsidian vault to Next.js project

# Configuration
OBSIDIAN_DIR="/Users/andrewlaery/Documents/andrewlaery/str/snowbirdhq-docs"
PROJECT_DIR="/Users/andrewlaery/Dropbox/____code/__Production/snowbirdhq-docs"
CONTENT_DIR="$PROJECT_DIR/content"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Snowbird HQ Content Sync${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if directories exist
if [ ! -d "$OBSIDIAN_DIR" ]; then
    echo -e "${RED}❌ Obsidian directory not found: $OBSIDIAN_DIR${NC}"
    exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Project directory not found: $PROJECT_DIR${NC}"
    exit 1
fi

# Create backup of current content
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$PROJECT_DIR/content_backup_$TIMESTAMP"

echo -e "${YELLOW}📦 Creating backup...${NC}"
cp -r "$CONTENT_DIR" "$BACKUP_DIR"
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"

# Sync content (excluding templates and git files)
echo -e "${YELLOW}🔄 Syncing content...${NC}"

# Remove old content (except .gitkeep files)
find "$CONTENT_DIR" -name "*.mdx" -delete
find "$CONTENT_DIR" -name "*.md" -delete

# Copy new content from Obsidian, excluding templates and git files
rsync -av \
    --exclude='.git/' \
    --exclude='templates/' \
    --exclude='.DS_Store' \
    --exclude='.obsidian/' \
    "$OBSIDIAN_DIR/" "$CONTENT_DIR/"

echo -e "${GREEN}✅ Content synced successfully${NC}"

# Show what was synced
echo -e "${BLUE}📋 Synced files:${NC}"
find "$CONTENT_DIR" -name "*.mdx" | sort

# Check if running in project directory and offer to build
cd "$PROJECT_DIR"

echo -e "${YELLOW}🔧 Would you like to build and test the changes?${NC}"
echo "1) npm run dev (development server)"
echo "2) npm run build (production build)" 
echo "3) Skip"
read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo -e "${BLUE}🚀 Starting development server...${NC}"
        npm run dev
        ;;
    2)
        echo -e "${BLUE}🏗️  Building for production...${NC}"
        npm run build
        ;;
    3)
        echo -e "${GREEN}✅ Sync complete!${NC}"
        ;;
    *)
        echo -e "${GREEN}✅ Sync complete!${NC}"
        ;;
esac

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Content sync finished!${NC}"
echo -e "Backup available at: ${YELLOW}$BACKUP_DIR${NC}"