#!/bin/bash

# Snowbird HQ Reverse Content Sync Script
# Syncs content from Next.js project back to Obsidian vault

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

echo -e "${BLUE}🔄 Snowbird HQ Reverse Content Sync${NC}"
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

# Create backup of current Obsidian content
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="$OBSIDIAN_DIR/obsidian_backup_$TIMESTAMP"

echo -e "${YELLOW}📦 Creating backup of Obsidian content...${NC}"
mkdir -p "$BACKUP_DIR"
cp -r "$OBSIDIAN_DIR/properties" "$BACKUP_DIR/" 2>/dev/null || true
cp -r "$OBSIDIAN_DIR/locations" "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✅ Backup created: $BACKUP_DIR${NC}"

# Sync content from project to Obsidian
echo -e "${YELLOW}🔄 Syncing content from project...${NC}"

# Remove old content files (preserve templates and git)
find "$OBSIDIAN_DIR/properties" -name "*.mdx" -delete 2>/dev/null || true
find "$OBSIDIAN_DIR/locations" -name "*.mdx" -delete 2>/dev/null || true

# Copy content from project
rsync -av \
    --include='properties/' \
    --include='locations/' \
    --include='**/' \
    --include='*.mdx' \
    --exclude='*' \
    "$CONTENT_DIR/" "$OBSIDIAN_DIR/"

echo -e "${GREEN}✅ Content synced from project successfully${NC}"

# Show what was synced
echo -e "${BLUE}📋 Synced files:${NC}"
find "$OBSIDIAN_DIR" -name "*.mdx" | grep -v templates | sort

# Commit changes to Obsidian git repo
cd "$OBSIDIAN_DIR"

if [ -d ".git" ]; then
    echo -e "${YELLOW}📝 Committing changes to Obsidian repo...${NC}"
    git add .
    if git commit -m "Sync from project - $(date)"; then
        echo -e "${GREEN}✅ Changes committed to Obsidian repo${NC}"
    else
        echo -e "${YELLOW}ℹ️  No changes to commit${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No git repository found in Obsidian folder${NC}"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Reverse content sync finished!${NC}"
echo -e "Backup available at: ${YELLOW}$BACKUP_DIR${NC}"